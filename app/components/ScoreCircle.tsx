const ScoreCircle = ({
  score = 75,
  issues = 0,
  size = "lg",
  showIssues = false,
}: {
  score: number;
  issues?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showIssues?: boolean;
}) => {
  const sizeConfig = {
    sm: { width: 60, radius: 24, stroke: 4, textSize: "text-xs" },
    md: { width: 80, radius: 32, stroke: 6, textSize: "text-sm" },
    lg: { width: 100, radius: 40, stroke: 8, textSize: "text-sm" },
    xl: { width: 120, radius: 48, stroke: 10, textSize: "text-base" },
  };

  const config = sizeConfig[size];
  const normalizedRadius = config.radius - config.stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // Get color based on score using theme colors
  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--primary))"; // Use theme primary
    if (score >= 60) return "hsl(142 76% 36%)"; // Green
    return "hsl(0 84% 60%)"; // Red
  };

  return (
    <div
      className={`relative`}
      style={{ width: config.width, height: config.width }}
    >
      <svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${config.width} ${config.width}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={normalizedRadius}
          stroke="hsl(var(--border))"
          strokeWidth={config.stroke}
          fill="transparent"
          opacity={0.3}
        />
        {/* Progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={normalizedRadius}
          stroke={getScoreColor(score)}
          strokeWidth={config.stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Score and Issues */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-semibold ${config.textSize} text-foreground`}>
          {score}/100
        </span>
        {showIssues && (
          <span className="text-xs text-muted-foreground mt-0.5">
            {issues} issues
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreCircle;
