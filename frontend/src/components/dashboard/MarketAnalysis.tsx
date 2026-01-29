// src/components/dashboard/MarketAnalysis.tsx
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, Target, DollarSign } from "lucide-react";
import type { UserPreferences } from "../../types";

interface MarketAnalysisProps {
  userPreferences?: UserPreferences | null;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = () => {
  // Skill Gap Data
  const skillGapData = [
    { skill: "React", yourLevel: 90, marketDemand: 95 },
    { skill: "TypeScript", yourLevel: 75, marketDemand: 92 },
    { skill: "Node.js", yourLevel: 60, marketDemand: 85 },
    { skill: "AWS", yourLevel: 40, marketDemand: 88 },
    { skill: "Docker", yourLevel: 35, marketDemand: 80 },
    { skill: "GraphQL", yourLevel: 50, marketDemand: 78 },
  ];

  // Salary Benchmark Data
  const salaryData = [
    { category: "You", salary: 120, color: "#0A66C2" },
    { category: "Market Avg", salary: 145, color: "#31A24C" },
    { category: "Top 25%", salary: 165, color: "#F4A301" },
  ];

  // Trend Watch Data - React jobs popularity
  const trendData = [
    { month: "Jan", jobs: 850 },
    { month: "Feb", jobs: 920 },
    { month: "Mar", jobs: 880 },
    { month: "Apr", jobs: 950 },
    { month: "May", jobs: 1020 },
    { month: "Jun", jobs: 1100 },
  ];

  // Custom tooltip for radar chart
  const CustomTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-900">{payload[0].payload.skill}</p>
          <p className="text-xs text-blue-600">You: {payload[0].value}%</p>
          {payload[1] && (
            <p className="text-xs text-gray-500">Market: {payload[1].value}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Find biggest skill gap
  const biggestGap = skillGapData.reduce((max, skill) => {
    const gap = skill.marketDemand - skill.yourLevel;
    return gap > (max.marketDemand - max.yourLevel) ? skill : max;
  });

  const gapPercentage = biggestGap.marketDemand - biggestGap.yourLevel;

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Market Intelligence</h2>

      {/* Charts Grid: 3 columns on desktop, 1 on tablet/mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Chart 1: Skill Gap Radar */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Skill Gap Radar</h3>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillGapData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fontSize: 12, fill: "#666666" }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Your Level"
                dataKey="yourLevel"
                stroke="#0A66C2"
                fill="#0A66C2"
                fillOpacity={0.6}
              />
              <Radar
                name="Market Demand"
                dataKey="marketDemand"
                stroke="#D3D3D3"
                fill="#D3D3D3"
                fillOpacity={0.2}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
                iconType="circle"
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* Insight */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs md:text-sm text-yellow-800">
              <strong>💡 Insight:</strong> Learning {biggestGap.skill} could increase your match
              rate by ~{gapPercentage}%.
            </p>
          </div>
        </div>

        {/* Chart 2: Salary Benchmark */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Salary Benchmark</h3>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#666666" }} />
              <YAxis tick={{ fontSize: 10, fill: "#666666" }} />
              <Tooltip
                formatter={(value) => `$${value}k`}
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D3D3D3",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="salary" radius={[8, 8, 0, 0]}>
                {salaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Insight */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs md:text-sm text-blue-800">
              <strong>📊 Insight:</strong> You're ${salaryData[1].salary - salaryData[0].salary}k below market average. Negotiating could help close the gap.
            </p>
          </div>
        </div>

        {/* Chart 3: Trend Watch */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Trend Watch</h3>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#666666" }} />
              <YAxis tick={{ fontSize: 10, fill: "#666666" }} />
              <Tooltip
                formatter={(value) => `${value} jobs`}
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D3D3D3",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#0A66C2"
                strokeWidth={3}
                dot={{ fill: "#0A66C2", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Insight */}
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs md:text-sm text-green-800">
              <strong>📈 Insight:</strong> React jobs are trending up (+30% this half). Great time to apply!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
