'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CodeStatsXP } from '@/lib/types';
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface CodeStatsChartProps {
  data: CodeStatsXP[];
}

export default function CodeStatsChart({ data }: CodeStatsChartProps) {
  const chartData = data.sort((a,b) => b.total_xp - a.total_xp).slice(0, 10);

  const chartConfig = {
    xp: {
      label: "XP",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Languages by XP</CardTitle>
        <CardDescription>
          Programming language statistics from my Code::Stats profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis 
                        dataKey="language" 
                        type="category" 
                        tickLine={false} 
                        axisLine={false} 
                        stroke="hsl(var(--foreground))"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        width={80}
                    />
                    <Tooltip 
                        cursor={{ fill: 'hsl(var(--card))' }}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="total_xp" name="Total XP" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
