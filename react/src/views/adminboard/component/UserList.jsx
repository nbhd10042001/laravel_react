import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function UserList({ users }) {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <div className="text-indigo-700 text-sm flex items-center hover:cursor-pointer hover:opacity-70">
                  <PencilIcon className="size-4"></PencilIcon> Edit
                </div>
                <div className="text-red-700 text-sm flex items-center hover:cursor-pointer hover:opacity-70">
                  <TrashIcon className="size-4"></TrashIcon> Delete
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
