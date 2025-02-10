import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { format, startOfDay, endOfDay, add } from "date-fns";
import { ja } from "date-fns/locale";

export type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
};

export type Milestone = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  color: string;
};

export type GanttChartProps = {
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
  className?: string;
};

export const COLORS = [
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
];

export function GanttChart({
  startDate,
  endDate,
  milestones,
  className,
}: GanttChartProps) {
  const DAY_WIDTH = 40;
  const SCROLL_THRESHOLD = 200;
  const DAYS_TO_ADD = 30;
  const INITIAL_PADDING_DAYS = 30;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 初期の表示範囲を設定（前後に余白を追加）
  const [visibleStartDate] = useState(() => {
    const earliestDate = milestones.reduce((earliest, milestone) => {
      const milestoneEarliest = milestone.tasks.reduce(
        (taskEarliest, task) =>
          task.startDate < taskEarliest ? task.startDate : taskEarliest,
        milestone.startDate
      );
      return milestoneEarliest < earliest ? milestoneEarliest : earliest;
    }, startDate);
    return add(earliestDate, { days: -INITIAL_PADDING_DAYS });
  });

  const [visibleEndDate] = useState(() => {
    const latestDate = milestones.reduce((latest, milestone) => {
      const milestoneLatest = milestone.tasks.reduce(
        (taskLatest, task) =>
          task.endDate > taskLatest ? task.endDate : taskLatest,
        milestone.endDate
      );
      return milestoneLatest > latest ? milestoneLatest : latest;
    }, endDate);
    return add(latestDate, { days: INITIAL_PADDING_DAYS });
  });

  // 表示用の日付配列を生成
  const dateHeaders = useMemo(() => {
    const dates: Date[] = [];
    let current = startOfDay(visibleStartDate);
    const end = endOfDay(visibleEndDate);

    while (current <= end) {
      dates.push(current);
      current = add(current, { days: 1 });
    }

    return dates;
  }, [visibleStartDate, visibleEndDate]);

  const getPositionAndWidth = (start: Date, end: Date) => {
    const startDiff = Math.round(
      (start.getTime() - visibleStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const duration =
      Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return {
      left: `${startDiff * DAY_WIDTH}px`,
      width: `${Math.max(duration * DAY_WIDTH - 2, DAY_WIDTH)}px`,
    };
  };

  return (
    <div className={`relative ${className || ""}`}>
      <div className="flex h-full">
        {/* 左側の固定カラム */}
        <div
          className={cn(
            "border-r border-gray-200 bg-white dark:bg-gray-800 transition-all duration-300 sticky left-0 z-20 flex flex-col",
            isSidebarOpen ? "w-1/3" : "w-12"
          )}
        >
          {/* サイドバーヘッダー */}
          <div className="h-[96px] bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 flex items-center justify-center" />

          {/* マイルストーンとタスクの一覧 */}
          <div>
            {milestones.map((milestone, milestoneIndex) => (
              <div key={milestone.id}>
                {/* マイルストーンの行 */}
                <div className="h-[48px] px-4 bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center">
                  <div
                    className={cn(
                      "flex items-center w-full",
                      isSidebarOpen ? "justify-between" : "justify-center"
                    )}
                  >
                    {isSidebarOpen ? (
                      <>
                        <div className="flex items-center space-x-3 min-w-0">
                          <div
                            className={`w-2 h-2 rounded-full ${milestone.color} flex-shrink-0`}
                          />
                          <span className="text-sm font-medium truncate">
                            {milestone.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {milestone.startDate
                              ? format(milestone.startDate, "MM/dd")
                              : "-"}
                            {" - "}
                            {milestone.endDate
                              ? format(milestone.endDate, "MM/dd")
                              : "-"}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div
                        className={`w-2 h-2 rounded-full ${milestone.color}`}
                      />
                    )}
                  </div>
                </div>
                {/* タスクの行 */}
                {milestone.tasks.map((task, taskIndex) => (
                  <div
                    key={task.id}
                    className="h-[48px] px-4 border-b flex items-center bg-white dark:bg-gray-600"
                  >
                    <div
                      className={cn(
                        "flex items-center w-full",
                        isSidebarOpen ? "justify-between" : "justify-center"
                      )}
                    >
                      {isSidebarOpen ? (
                        <>
                          <div className="flex items-center space-x-3 min-w-0">
                            <div
                              className={`w-2 h-2 rounded-full ${milestone.color} flex-shrink-0`}
                            />
                            <span className="text-sm truncate">
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {task.startDate
                                ? format(task.startDate, "MM/dd")
                                : "-"}
                              {" - "}
                              {task.endDate
                                ? format(task.endDate, "MM/dd")
                                : "-"}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`w-2 h-2 rounded-full ${milestone.color}`}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 右側のガントチャート */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-x-auto">
            <div
              style={{
                width: `${dateHeaders.length * DAY_WIDTH}px`,
                minWidth: "100%",
              }}
            >
              {/* カレンダーヘッダー */}
              <div className="border bg-gray-50 dark:bg-gray-800 sticky top-0 z-10 h-[96px] flex flex-col">
                {/* 年表示 */}
                <div
                  className="grid h-[32px] border-b"
                  style={{
                    gridTemplateColumns: `repeat(${dateHeaders.length}, ${DAY_WIDTH}px)`,
                  }}
                >
                  {dateHeaders.map((date, i) =>
                    (date.getMonth() === 0 && date.getDate() === 1) ||
                    i === 0 ? (
                      <div
                        key={i}
                        className="px-1 py-2 text-sm font-medium text-center border-r"
                        style={{
                          gridColumn: `span ${
                            new Date(date.getFullYear() + 1, 0, 1).getTime() -
                              date.getTime() >
                            endOfDay(
                              dateHeaders[dateHeaders.length - 1]
                            ).getTime() -
                              date.getTime()
                              ? Math.ceil(
                                  (endOfDay(
                                    dateHeaders[dateHeaders.length - 1]
                                  ).getTime() -
                                    date.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              : Math.ceil(
                                  (new Date(
                                    date.getFullYear() + 1,
                                    0,
                                    1
                                  ).getTime() -
                                    date.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )
                          }`,
                        }}
                      >
                        {format(date, "yyyy年", { locale: ja })}
                      </div>
                    ) : null
                  )}
                </div>

                {/* 月表示 */}
                <div
                  className="grid h-[32px]"
                  style={{
                    gridTemplateColumns: `repeat(${dateHeaders.length}, ${DAY_WIDTH}px)`,
                  }}
                >
                  {dateHeaders.map((date, i) => {
                    // 月の最初の日、または表示範囲の最初の日の場合のみ月を表示
                    const isFirstDayOfMonth = date.getDate() === 1;
                    const isFirstDay = i === 0;
                    const shouldDisplayMonth = isFirstDayOfMonth || isFirstDay;

                    if (shouldDisplayMonth) {
                      // その月の残りの日数を計算
                      const daysInMonth = new Date(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        0
                      ).getDate();
                      const remainingDays = daysInMonth - date.getDate() + 1;
                      // 表示可能な日数（dateHeadersの残り）を計算
                      const availableDays = dateHeaders.length - i;
                      // 実際に表示する日数（月の残り日数と表示可能な日数の小さい方）
                      const daysToSpan = Math.min(remainingDays, availableDays);

                      return (
                        <div
                          key={i}
                          className="px-1 flex items-center justify-center text-sm font-medium text-center border-r h-full"
                          style={{
                            gridColumn: `span ${daysToSpan}`,
                          }}
                        >
                          {format(date, "M月", { locale: ja })}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* 日付表示 */}
                <div
                  className="grid h-[32px]"
                  style={{
                    gridTemplateColumns: `repeat(${dateHeaders.length}, ${DAY_WIDTH}px)`,
                  }}
                >
                  {dateHeaders.map((date, i) => (
                    <div
                      key={i}
                      className={cn(
                        "px-1 flex items-center justify-center text-sm text-center border-r last:border-r-0 h-full",
                        date.getDay() === 0
                          ? "text-red-500"
                          : date.getDay() === 6
                          ? "text-blue-500"
                          : ""
                      )}
                    >
                      {format(date, "d", { locale: ja })}
                    </div>
                  ))}
                </div>
              </div>

              {/* ガントチャートのグリッドとバー */}
              <div className="relative border border-gray-200 dark:border-gray-700 border-y-0">
                {/* グリッド線 */}
                <div
                  className="absolute inset-0 grid pointer-events-none"
                  style={{
                    gridTemplateColumns: `repeat(${dateHeaders.length}, ${DAY_WIDTH}px)`,
                    height: `${milestones.reduce(
                      (total, milestone) =>
                        total + 48 + milestone.tasks.length * 48,
                      0
                    )}px`,
                  }}
                >
                  {dateHeaders.map((date, i) => (
                    <div
                      key={i}
                      className={cn(
                        "border-r border-gray-200 dark:border-gray-700 h-full",
                        date.getDay() === 0 || date.getDay() === 6
                          ? "bg-gray-50 dark:bg-gray-600"
                          : "dark:bg-gray-800"
                      )}
                    />
                  ))}
                </div>

                {/* マイルストーンとタスクのバー */}
                <div className="relative">
                  {milestones.map((milestone, milestoneIndex) => (
                    <React.Fragment key={milestone.id}>
                      {/* マイルストーンバー */}
                      <div className="h-[48px] flex items-center relative">
                        <div
                          className={`absolute h-8 mx-1 rounded ${milestone.color} opacity-90`}
                          style={{
                            ...getPositionAndWidth(
                              milestone.startDate,
                              milestone.endDate
                            ),
                            top: "10px",
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-white dark:text-gray-800 font-medium">
                            <span className="px-2 truncate max-w-full">
                              {milestone.title}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* タスクバー */}
                      {milestone.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="h-[48px] flex items-center relative"
                        >
                          <div
                            className={`absolute h-8 mx-1 rounded ${milestone.color} opacity-75`}
                            style={{
                              ...getPositionAndWidth(
                                task.startDate,
                                task.endDate
                              ),
                              top: "10px",
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-white dark:text-gray-800 font-medium">
                              <span className="px-2 truncate max-w-full">
                                {task.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
