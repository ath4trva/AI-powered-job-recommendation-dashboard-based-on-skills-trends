import { TrendingUp, Target, DollarSign, Award } from 'lucide-react';

interface RightSidebarProps {
  onReviewSavedJobs?: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onReviewSavedJobs }) => {

  // Market Value Trend Data (last 6 months)

  const marketValueData = [

    { month: 'Jan', value: 80, x: 0 },

    { month: 'Mar', value: 90, x: 20 },

    { month: 'May', value: 95, x: 40 },

    { month: 'Jul', value: 100, x: 60 },

    { month: 'Sep', value: 110, x: 80 },

    { month: 'Now', value: 120, x: 100 },

  ];



  const currentValue = 120;

  const previousValue = 105;

  const valueChange = currentValue - previousValue;

  



  // Skill Gap Data (Radar Chart Points)

  const skillGapData = [

    { skill: 'React', yourLevel: 90, marketDemand: 85, angle: 0, color: 'text-blue-600' },

    { skill: 'TypeScript', yourLevel: 75, marketDemand: 95, angle: 72, color: 'text-purple-600' },

    { skill: 'Node.js', yourLevel: 60, marketDemand: 80, angle: 144, color: 'text-green-600' },

    { skill: 'Docker', yourLevel: 40, marketDemand: 85, angle: 216, color: 'text-orange-600' },

    { skill: 'AWS', yourLevel: 45, marketDemand: 90, angle: 288, color: 'text-red-600' },

  ];



  // Find biggest gap

  const biggestGap = skillGapData.reduce((max, skill) => {

    const gap = skill.marketDemand - skill.yourLevel;

    return gap > (max.marketDemand - max.yourLevel) ? skill : max;

  });



  // SVG Radar Chart Helper

  const getRadarPoint = (percentage: number, angle: number, centerX: number, centerY: number, maxRadius: number) => {

    const radius = (percentage / 100) * maxRadius;

    const radian = (angle - 90) * (Math.PI / 180);

    return {

      x: centerX + radius * Math.cos(radian),

      y: centerY + radius * Math.sin(radian),

    };

  };



  const centerX = 80;

  const centerY = 80;

  const maxRadius = 60;



  const yourSkillsPath = skillGapData.map((skill, i) => {

    const point = getRadarPoint(skill.yourLevel, skill.angle, centerX, centerY, maxRadius);

    return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;

  }).join(' ') + ' Z';



  const marketDemandPath = skillGapData.map((skill, i) => {

    const point = getRadarPoint(skill.marketDemand, skill.angle, centerX, centerY, maxRadius);

    return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;

  }).join(' ') + ' Z';



  return (

    <aside className="w-full flex flex-col gap-4">

      {/* 1. MARKET VALUE TREND CHART */}

      <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-5">

        <div className="flex items-center gap-2 mb-1">

          <DollarSign className="w-4 md:w-5 h-4 md:h-5 text-green-600" />

          <h3 className="text-sm md:text-base font-bold text-gray-900">Your Market Value</h3>

        </div>

        <p className="text-xs text-gray-500 mb-4">Based on skills, experience & location</p>



        {/* Line Chart */}

        <div className="relative h-24 md:h-32 mb-4">

          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">

            {/* Grid Lines */}

            <line x1="0" y1="10" x2="100" y2="10" stroke="#f3f4f6" strokeWidth="0.3" />

            <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.3" />

            <line x1="0" y1="30" x2="100" y2="30" stroke="#f3f4f6" strokeWidth="0.3" />



            {/* Gradient Fill */}

            <defs>

              <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">

                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />

                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />

              </linearGradient>

            </defs>



            {/* Area under line */}

            <path

              d={`M 0 ${40 - (marketValueData[0].value / 3)} 

                  L 20 ${40 - (marketValueData[1].value / 3)}

                  L 40 ${40 - (marketValueData[2].value / 3)}

                  L 60 ${40 - (marketValueData[3].value / 3)}

                  L 80 ${40 - (marketValueData[4].value / 3)}

                  L 100 ${40 - (marketValueData[5].value / 3)}

                  L 100 40 L 0 40 Z`}

              fill="url(#marketGradient)"

            />



            {/* Line */}

            <polyline

              points={marketValueData.map(d => `${d.x},${40 - (d.value / 3)}`).join(' ')}

              fill="none"

              stroke="#3b82f6"

              strokeWidth="0.8"

              strokeLinecap="round"

              strokeLinejoin="round"

            />



            {/* Data Points */}

            {marketValueData.map((d, i) => (

              <circle

                key={i}

                cx={d.x}

                cy={40 - (d.value / 3)}

                r="1.2"

                fill="#3b82f6"

                stroke="white"

                strokeWidth="0.5"

              />

            ))}



            {/* Last point highlight */}

            <circle

              cx="100"

              cy={40 - (marketValueData[5].value / 3)}

              r="2"

              fill="#3b82f6"

              stroke="white"

              strokeWidth="0.8"

            />

          </svg>



          {/* Y-axis labels */}

          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-gray-400 -ml-8">

            <span>$120k</span>

            <span>$100k</span>

            <span>$80k</span>

          </div>

        </div>



        {/* X-axis labels */}

        <div className="flex justify-between text-[10px] text-gray-400 mb-4 px-1">

          {marketValueData.map((d, i) => (

            <span key={i}>{d.month}</span>

          ))}

        </div>



        {/* Stats */}

        <div className="space-y-2">

          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">

            <span className="text-xs text-green-700 font-medium">vs Last Quarter</span>

            <span className="text-sm font-bold text-green-700 flex items-center gap-1">

              <TrendingUp className="w-3 h-3" />

              +${valueChange}k

            </span>

          </div>

          <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">

            <span className="text-xs text-blue-700 font-medium">Market Percentile</span>

            <span className="text-sm font-bold text-blue-700">Top 20%</span>

          </div>

        </div>

      </div>



      {/* 2. SKILL GAP RADAR CHART */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

        <div className="flex items-center gap-2 mb-1">

          <Target className="w-5 h-5 text-purple-600" />

          <h3 className="text-base font-bold text-gray-900">Skill Gap Analysis</h3>

        </div>

        <p className="text-xs text-gray-500 mb-4">Your skills vs market demand</p>



        {/* Radar Chart */}

        <div className="flex justify-center mb-4">

          <svg width="160" height="160" viewBox="0 0 160 160">

            {/* Background circles */}

            {[20, 40, 60].map((r) => (

              <circle

                key={r}

                cx={centerX}

                cy={centerY}

                r={r}

                fill="none"

                stroke="#f3f4f6"

                strokeWidth="1"

              />

            ))}



            {/* Axis lines */}

            {skillGapData.map((skill) => {

              const point = getRadarPoint(100, skill.angle, centerX, centerY, maxRadius);

              return (

                <line

                  key={skill.skill}

                  x1={centerX}

                  y1={centerY}

                  x2={point.x}

                  y2={point.y}

                  stroke="#e5e7eb"

                  strokeWidth="1"

                />

              );

            })}



            {/* Market Demand (dotted) */}

            <path

              d={marketDemandPath}

              fill="rgba(156, 163, 175, 0.1)"

              stroke="#9ca3af"

              strokeWidth="2"

              strokeDasharray="4,4"

            />



            {/* Your Skills (solid) */}

            <path

              d={yourSkillsPath}

              fill="rgba(59, 130, 246, 0.2)"

              stroke="#3b82f6"

              strokeWidth="2"

            />



            {/* Skill points */}

            {skillGapData.map((skill) => {

              const yourPoint = getRadarPoint(skill.yourLevel, skill.angle, centerX, centerY, maxRadius);

              return (

                <circle

                  key={skill.skill}

                  cx={yourPoint.x}

                  cy={yourPoint.y}

                  r="3"

                  fill="#3b82f6"

                  stroke="white"

                  strokeWidth="2"

                />

              );

            })}



            {/* Skill labels */}

            {skillGapData.map((skill) => {

              const labelPoint = getRadarPoint(115, skill.angle, centerX, centerY, maxRadius);

              return (

                <text

                  key={skill.skill}

                  x={labelPoint.x}

                  y={labelPoint.y}

                  textAnchor="middle"

                  dominantBaseline="middle"

                  className="text-[9px] font-semibold fill-gray-700"

                >

                  {skill.skill}

                </text>

              );

            })}

          </svg>

        </div>



        {/* Legend */}

        <div className="flex items-center justify-center gap-4 mb-4 text-xs">

          <div className="flex items-center gap-1.5">

            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>

            <span className="text-gray-600">Your Skills</span>

          </div>

          <div className="flex items-center gap-1.5">

            <div className="w-3 h-1 bg-gray-400 border-2 border-dashed border-gray-400"></div>

            <span className="text-gray-600">Market Demand</span>

          </div>

        </div>



        {/* Recommendation */}

        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">

          <div className="flex items-start gap-2">

            <span className="text-sm">💡</span>

            <div>

              <p className="text-xs text-purple-900 font-semibold mb-1">

                Focus on: {biggestGap.skill}

              </p>

              <p className="text-xs text-purple-700">

                Closing this gap could increase salary by +40%

              </p>

            </div>

          </div>

        </div>

      </div>



      {/* 3. SALARY COMPARISON */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

        <div className="flex items-center gap-2 mb-4">

          <Award className="w-5 h-5 text-yellow-600" />

          <h3 className="text-base font-bold text-gray-900">Salary Comparison</h3>

        </div>



        <div className="space-y-3">

          <div>

            <div className="flex justify-between items-center mb-1.5">

              <span className="text-xs font-medium text-gray-600">Your Salary</span>

              <span className="text-sm font-bold text-gray-900">$120k</span>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5">

              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>

            </div>

          </div>



          <div>

            <div className="flex justify-between items-center mb-1.5">

              <span className="text-xs font-medium text-gray-600">Market Average</span>

              <span className="text-sm font-bold text-gray-900">$110k</span>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5">

              <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '73%' }}></div>

            </div>

          </div>



          <div>

            <div className="flex justify-between items-center mb-1.5">

              <span className="text-xs font-medium text-gray-600">Top 10%</span>

              <span className="text-sm font-bold text-gray-900">$150k</span>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5">

              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>

            </div>

          </div>



          <div>

            <div className="flex justify-between items-center mb-1.5">

              <span className="text-xs font-medium text-gray-600">Entry Level</span>

              <span className="text-sm font-bold text-gray-900">$80k</span>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5">

              <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: '53%' }}></div>

            </div>

          </div>

        </div>



        <div className="mt-4 p-3 bg-blue-50 rounded-lg">

          <p className="text-xs text-blue-800">

            <strong>You're doing great!</strong> Your salary is 9% above market average

          </p>

        </div>

      </div>



      {/* 4. QUICK INSIGHTS */}

      <div className="bg-gradient-to-br from-indigo-600 to-black rounded-xl shadow-sm p-5 text-white">

        <h3 className="text-sm font-bold mb-3">💼 Market Insights</h3>

        

        <div className="space-y-2.5 text-xs">

          <div className="flex items-start gap-2">

            <span className="text-purple-200">•</span>

            <p className="text-purple-50">

              <strong className="text-white">Remote roles</strong> pay 15% more in your field

            </p>

          </div>

          <div className="flex items-start gap-2">

            <span className="text-purple-200">•</span>

            <p className="text-purple-50">

              <strong className="text-white">3 companies</strong> in your area are hiring senior roles

            </p>

          </div>

          <div className="flex items-start gap-2">

            <span className="text-purple-200">•</span>

            <p className="text-purple-50">

              Adding <strong className="text-white">AWS certification</strong> could unlock $25k more

            </p>

          </div>

        </div>



        <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg text-sm font-semibold transition-colors">

          View Full Report

        </button>

      </div>

    </aside>

  );

};



export default RightSidebar;