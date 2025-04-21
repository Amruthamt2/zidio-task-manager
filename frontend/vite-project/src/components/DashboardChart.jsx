import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', tasks: 2 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 1 },
  { name: 'Thu', tasks: 4 },
  { name: 'Fri', tasks: 2 },
];

const DashboardChart = () => (
  <div className="w-full h-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tasks" fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardChart;