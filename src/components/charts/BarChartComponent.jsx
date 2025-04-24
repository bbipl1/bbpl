import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,Label } from "recharts";

const BarChartComponent = ({ datas}) => {


  return (
    <div className="w-full h-96 ">
      <h2 className="text-lg font-bold text-center mb-4">Expense & Profit Analysis</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datas} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label offset={-40} style={{margin:"10px"}} value="Expense Categories"  position="insideBottom" />
          </XAxis>
          {/* Y-Axis with Label */}
          <YAxis>
            <Label value="Amount (INR)" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#0088FE" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
