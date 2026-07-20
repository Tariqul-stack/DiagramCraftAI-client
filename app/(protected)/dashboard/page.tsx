"use client";

import Link from "next/link";
import { useGetMe } from "@/hooks/useAuth";
import { useGetMyDiagrams } from "@/hooks/useDiagrams";
import type { Diagram } from "@/types/diagram.types";
import { LayoutDashboard, Globe, Lock, Heart, Plus, Eye } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PIE_COLORS = ['#4F46E5', '#9333EA', '#06B6D4', '#10B981', '#F97316', '#EC4899'];

export default function DashboardPage() {
  const { data: user } = useGetMe();
  const { data: diagrams = [], isLoading } = useGetMyDiagrams();

  const totalDiagrams = diagrams.length;
  const publicDiagrams = diagrams.filter((d) => d.visibility === "public").length;
  const privateDiagrams = diagrams.filter((d) => d.visibility === "private").length;
  const totalLikes = diagrams.reduce((sum, d) => sum + (d.likeCount || 0), 0);

  // Pie Chart Data
  const typeCounts = diagrams.reduce((acc, d) => {
    acc[d.diagramType] = (acc[d.diagramType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(typeCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  // Bar Chart Data (Top 7 or Last 7)
  const barData = diagrams.slice(0, 7).map((d) => ({
    name: d.title.length > 15 ? d.title.substring(0, 15) + "..." : d.title,
    likes: d.likeCount || 0,
  }));

  // Table Data
  const recentTableDiagrams = diagrams.slice(0, 5);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Welcome back, {user?.name || "User"}!
            </p>
          </div>
          <Link
            href="/diagrams/add"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shrink-0"
          >
            <Plus size={18} />
            Create Diagram
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="bg-indigo-50 rounded-xl p-3 w-fit mb-4">
              <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            </div>
            {isLoading ? (
              <div className="h-9 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
            ) : (
              <div className="text-3xl font-bold text-gray-900">{totalDiagrams}</div>
            )}
            <div className="text-sm text-gray-500 mt-1">Total Diagrams</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="bg-green-50 rounded-xl p-3 w-fit mb-4">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            {isLoading ? (
              <div className="h-9 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
            ) : (
              <div className="text-3xl font-bold text-gray-900">{publicDiagrams}</div>
            )}
            <div className="text-sm text-gray-500 mt-1">Public Diagrams</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="bg-purple-50 rounded-xl p-3 w-fit mb-4">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            {isLoading ? (
              <div className="h-9 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
            ) : (
              <div className="text-3xl font-bold text-gray-900">{privateDiagrams}</div>
            )}
            <div className="text-sm text-gray-500 mt-1">Private Diagrams</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="bg-red-50 rounded-xl p-3 w-fit mb-4">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            {isLoading ? (
              <div className="h-9 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
            ) : (
              <div className="text-3xl font-bold text-gray-900">{totalLikes}</div>
            )}
            <div className="text-sm text-gray-500 mt-1">Total Likes</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Diagrams by Type</h2>
            <div className="flex-1 min-h-[300px]">
              {isLoading ? (
                <div className="w-full h-full bg-gray-100 rounded-xl animate-pulse"></div>
              ) : pieData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Diagrams</h2>
            <div className="flex-1 min-h-[300px]">
              {isLoading ? (
                <div className="w-full h-full bg-gray-100 rounded-xl animate-pulse"></div>
              ) : barData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6B7280', fontSize: 12 }} 
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: '#F3F4F6' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    />
                    <Bar dataKey="likes" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Diagrams Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Diagrams</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Visibility</th>
                  <th className="px-6 py-4 font-semibold">Likes</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div></td>
                      <td className="px-6 py-4 text-right"><div className="h-8 bg-gray-200 rounded-xl animate-pulse w-20 ml-auto"></div></td>
                    </tr>
                  ))
                ) : recentTableDiagrams.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No diagrams yet. Create your first one!
                    </td>
                  </tr>
                ) : (
                  recentTableDiagrams.map((diagram) => (
                    <tr key={diagram._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[200px]">
                        {diagram.title}
                      </td>
                      <td className="px-6 py-4 capitalize">{diagram.diagramType}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            diagram.visibility === "private"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {diagram.visibility}
                        </span>
                      </td>
                      <td className="px-6 py-4">{diagram.likeCount || 0}</td>
                      <td className="px-6 py-4">
                        {new Date(diagram.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/diagrams/${diagram._id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
