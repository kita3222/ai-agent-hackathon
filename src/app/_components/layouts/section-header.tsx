import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  button?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  button,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {button && button}
      </div>
    </div>
  );
};

export default SectionHeader;
