import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define colors and corresponding task statuses for pie 
const COLORS = ["#82ca9d", "#ffc658", "#8884d8"]; // Green, Yellow, Purple
const colorMeanings = {
  "#82ca9d": "Completed",  // Green
  "#ffc658": "In Progress",  // Yellow
  "#8884d8": "To Do",  // Purple
};

export const Chart = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* Bar Chart showing task status */}
      <h4 className="text-xl text-gray-600 font-semibold">Task Status Bar Chart</h4>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      {/* Line Chart showing task status */}
      <h4 className="text-xl text-gray-600 font-semibold">Task Status Line Chart</h4>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Pie Chart showing task distribution */}
      <h4 className="text-xl text-gray-600 font-semibold">Task Distribution Pie Chart</h4>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            dataKey="total"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const { fill, name, value } = payload[0];
              const taskStatus = colorMeanings[fill] ;
              return (
                <div className="custom-tooltip" style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
                  <strong>{taskStatus}</strong>
                  <div>{name}: {value}</div>
                </div>
              );
            }}
          />
          <Legend
            payload={COLORS.map((color) => ({
              value: colorMeanings[color], // Map color to its status
              type: "square",
              color,
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
