/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NutritionCard({ title, value, unit, icon: Icon, color, percentage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-none shadow-xl shadow-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div className={`h-1 bg-gradient-to-r ${color}`} />
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                <span className="text-sm text-gray-500">{unit}</span>
              </div>
            </div>
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} bg-opacity-10`}>
              <Icon className="w-6 h-6" style={{ color: color.split(' ')[1] }} />
            </div>
          </div>
          {percentage && (
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`h-full bg-gradient-to-r ${color} rounded-full`}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}