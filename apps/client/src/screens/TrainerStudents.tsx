import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, Plus, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudentsProps {
  user: { id: number; username: string };
}

const Students = ({ user }: StudentsProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const studentsData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210", status: "Inactive" },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Students</h1>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 h-[52px] border border-solid border-gray-400 rounded-none font-text-medium-default text-textlight bg-white"
            />
          </div>
        </div>
        <div className="space-y-4">
          {studentsData.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(student => (
            <Card key={student.id}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span>{student.email}</span>
                    <Phone className="w-4 h-4 ml-4" />
                    <span>{student.phone}</span>
                  </div>
                </div>
                <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;