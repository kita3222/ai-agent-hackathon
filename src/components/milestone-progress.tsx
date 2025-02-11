import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type MilestoneProgressProps = {
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
};

export function MilestoneProgress({
  title,
  startDate,
  endDate,
  progress,
}: MilestoneProgressProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <span>{format(startDate, "MM/dd")}</span>
          <span>{format(endDate, "MM/dd")}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="mt-2 text-right text-sm font-medium">
          {Math.round(progress)}%
        </div>
      </CardContent>
    </Card>
  );
}
