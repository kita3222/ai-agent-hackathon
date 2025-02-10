import { cn } from "@/lib/utils";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  isToday,
} from "date-fns";
import { ja } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
};

type Milestone = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  color: string;
};

type GanttChartProps = {
  milestones: Milestone[];
  startDate: Date;
  endDate: Date;
};

const COLORS = [
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
];

export function GanttChart({
  milestones,
  startDate,
  endDate,
}: GanttChartProps) {
  const dateRange = eachDayOfInterval({
    start: startOfMonth(startDate),
    end: endOfMonth(endDate),
  });
  const weekRange = eachWeekOfInterval({
    start: startOfMonth(startDate),
    end: endOfMonth(endDate),
  });

  const calculatePosition = (taskStartDate: Date, taskEndDate: Date) => {
    const totalDays = dateRange.length;
    const startDayIndex = dateRange.findIndex((date) =>
      isSameDay(date, taskStartDate)
    );
    const endDayIndex = dateRange.findIndex((date) =>
      isSameDay(date, taskEndDate)
    );

    const left = (startDayIndex / totalDays) * 100;
    const width = ((endDayIndex - startDayIndex + 1) / totalDays) * 100;

    return {
      left: `${left}%`,
      width: `${width}%`,
    };
  };

  return (
    <div className="border rounded-lg p-4 overflow-x-auto bg-white">
      <div className="min-w-[800px]">
        {/* Month Header */}
        <div className="flex border-b mb-2">
          <div className="w-1/4" />
          <div className="w-3/4 flex">
            {dateRange.map((date, index) => (
              <div
                key={date.getTime()}
                className={cn(
                  "flex-1 text-center text-xs p-1 font-medium",
                  index === 0 || date.getDate() === 1 ? "border-l" : ""
                )}
              >
                {(index === 0 || date.getDate() === 1) && (
                  <div className="mb-1">
                    {format(date, "M月", { locale: ja })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Week Header */}
        <div className="flex border-b mb-2">
          <div className="w-1/4" />
          <div className="w-3/4 flex">
            {weekRange.map((week) => (
              <div
                key={week.getTime()}
                className="flex-1 text-center text-xs p-1 font-medium border-l"
              >
                第{format(week, "w")}週
              </div>
            ))}
          </div>
        </div>

        {/* Day Header */}
        <div className="flex border-b mb-4">
          <div className="w-1/4 p-2 font-medium">マイルストーン / タスク</div>
          <div className="w-3/4 flex">
            {dateRange.map((date) => (
              <div
                key={date.getTime()}
                className={cn(
                  "flex-1 text-center text-xs p-1",
                  isToday(date) && "bg-blue-100",
                  date.getDay() === 0 && "text-red-500",
                  date.getDay() === 6 && "text-blue-500"
                )}
              >
                {format(date, "d")}
              </div>
            ))}
          </div>
        </div>

        {/* Gantt Chart Body */}
        <div className="space-y-4">
          {milestones.map((milestone, milestoneIndex) => (
            <div key={milestone.id} className="mb-2">
              <div className="flex items-center bg-gray-100 rounded-t-md">
                <div className="w-1/4 p-2">
                  <h4 className="font-semibold text-sm">{milestone.title}</h4>
                </div>
                <div className="w-3/4 relative h-8">
                  <div
                    className={cn(
                      "absolute h-6 rounded-full top-1",
                      COLORS[milestoneIndex % COLORS.length],
                      "opacity-90 hover:opacity-100 transition-opacity"
                    )}
                    style={calculatePosition(
                      milestone.startDate,
                      milestone.endDate
                    )}
                  />
                </div>
              </div>
              {milestone.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center bg-gray-50 rounded-b-md"
                >
                  <div className="w-1/4 p-2 pl-8">
                    <p className="text-xs">{task.title}</p>
                  </div>
                  <div className="w-3/4 relative h-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "absolute h-4 rounded-full top-1 cursor-pointer",
                              COLORS[milestoneIndex % COLORS.length],
                              "opacity-50 hover:opacity-70 transition-opacity",
                              task.completed && "bg-green-500"
                            )}
                            style={calculatePosition(
                              task.startDate,
                              task.endDate
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{task.title}</p>
                          <p>開始: {format(task.startDate, "yyyy/MM/dd")}</p>
                          <p>終了: {format(task.endDate, "yyyy/MM/dd")}</p>
                          <p>状態: {task.completed ? "完了" : "未完了"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
