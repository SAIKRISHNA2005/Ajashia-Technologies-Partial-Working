"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminCheck } from "@/components/admin-check"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Clock, CheckCircle, AlertCircle, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/admin/support/tickets")
      const data = await response.json()
      setTickets(data)
    } catch (error) {
      console.error("Error fetching tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTicketMessages = async (ticketId: string) => {
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticketId}/messages`)
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const handleStatusUpdate = async (ticketId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchTickets()
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket({ ...selectedTicket, status })
        }
      }
    } catch (error) {
      console.error("Error updating ticket status:", error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedTicket) return

    try {
      const response = await fetch(`/api/admin/support/tickets/${selectedTicket.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          is_internal: false,
        }),
      })

      if (response.ok) {
        setNewMessage("")
        fetchTicketMessages(selectedTicket.id)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "closed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <MessageCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Support Management</h1>
          <p className="text-muted-foreground">Manage customer support tickets and inquiries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                  <p className="text-2xl font-bold">{tickets.filter((t: any) => t.status === "open").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{tickets.filter((t: any) => t.status === "in_progress").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{tickets.filter((t: any) => t.status === "resolved").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
                  <p className="text-2xl font-bold">{tickets.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Manage and respond to customer support requests</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket: any) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono text-sm">#{ticket.id.slice(0, 8)}</TableCell>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {ticket.users?.name || "Unknown"}
                        </div>
                      </TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ticket.status)}
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace("_", " ").charAt(0).toUpperCase() +
                              ticket.status.replace("_", " ").slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedTicket(ticket)
                                fetchTicketMessages(ticket.id)
                              }}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Ticket #{selectedTicket?.id.slice(0, 8)}</DialogTitle>
                              <DialogDescription>{selectedTicket?.subject}</DialogDescription>
                            </DialogHeader>
                            {selectedTicket && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Status</p>
                                    <Select
                                      value={selectedTicket.status}
                                      onValueChange={(value) => handleStatusUpdate(selectedTicket.id, value)}
                                    >
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Priority</p>
                                    <Badge className={getPriorityColor(selectedTicket.priority)}>
                                      {selectedTicket.priority.charAt(0).toUpperCase() +
                                        selectedTicket.priority.slice(1)}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="border rounded-lg p-4 bg-muted/50">
                                  <p className="text-sm font-medium mb-2">Original Message</p>
                                  <p className="text-sm">{selectedTicket.description}</p>
                                </div>

                                <div className="space-y-4 max-h-60 overflow-y-auto">
                                  {messages.map((message: any) => (
                                    <div
                                      key={message.id}
                                      className={`p-3 rounded-lg ${
                                        message.is_internal ? "bg-blue-50 border-l-4 border-blue-500" : "bg-gray-50"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-medium">{message.users?.name || "Support Agent"}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {new Date(message.created_at).toLocaleString()}
                                        </p>
                                      </div>
                                      <p className="text-sm">{message.message}</p>
                                    </div>
                                  ))}
                                </div>

                                <form onSubmit={handleSendMessage} className="space-y-2">
                                  <Textarea
                                    placeholder="Type your response..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    rows={3}
                                  />
                                  <Button type="submit" disabled={!newMessage.trim()}>
                                    Send Response
                                  </Button>
                                </form>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminCheck>
  )
}
