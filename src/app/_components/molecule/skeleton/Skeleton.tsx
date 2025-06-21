import React from 'react'

export const Skeleton = () => {
  return (
    <div className="animate-pulse">
    <table className="w-full mt-6 border text-left">
      <thead className="bg-primary text-white">
        <tr>
          <th className="p-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </th>
          <th className="p-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </th>
          <th className="p-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </th>
          <th className="p-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td className="p-2 border">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td className="p-2 border">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td className="p-2 border">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
