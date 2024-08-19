import React from 'react';
import { Bar } from 'recharts';
import { BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const AnimatedBar = (props) => {
  return (
    <motion.rect
      {...props}
      initial={{ y: props.height, height: 0 }}
      animate={{ y: props.y, height: props.height }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
};

const BarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" shape={<AnimatedBar />} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;