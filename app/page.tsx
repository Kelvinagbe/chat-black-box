'use client'

import React, { useState, useEffect } from 'react';
import { Send, Search, MoreVertical, Paperclip, Smile, Menu, X } from 'lucide-react';

export default function BlackBoxChat() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chats = [
    { id: 1, name: 'Dev Team', lastMessage: 'Push to production?', time: '10:30', unread: 2, avatar: 'DT' },
    { id: 2, name: 'Sarah Chen', lastMessage: 'Code review done ✓', time: '09:15', unread: 0, avatar: 'SC' },
    { id: 3, name: 'Project Alpha', lastMessage: 'Meeting at 3pm', time: 'Yesterday', unread: 5, avatar: 'PA' },
    { id: 4, name: 'John Doe', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 0, avatar: 'JD' },
    { id: 5, name: 'Bug Hunters', lastMessage: 'Found critical issue', time: 'Friday', unread: 1, avatar: 'BH' },
  ];

  const messages = [
    { id: 1, sender: 'Sarah Chen', content: 'Hey team! How are things going?', time: '09:00', isMine: false },
    { id: 2, sender: 'You', content: 'Working on the new feature', time: '09:05', isMine: true },
    { id: 3, sender: 'Sarah Chen', content: 'Awesome! Need any help?', time: '09:06', isMine: false },
    { id: 4, sender: 'You', content: 'All good, thanks! Should be done by EOD', time: '09:10', isMine: true },
    { id: 5, sender: 'Sarah Chen', content: 'Perfect! Let me know if you need anything', time: '09:15', isMine: false },
  ];

  const handleSendMessage = () => message.trim() && setMessage('');
  const handleChatSelect = (index) => {
    setSelectedChat(index);
    isMobile && setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-black font-sans overflow-hidden relative">
      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-[9]" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div 
        className={`w-[350px] max-w-full bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col transition-transform z-10
          ${isMobile ? 'fixed top-0 left-0 bottom-0 w-[85vw]' : ''} 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-4 bg-[#0f0f0f] border-b border-[#1a1a1a] flex justify-between items-center">
          <h2 className="text-xl font-bold m-0">
            <span className="text-[#b1b2be]">Black</span>
            <span className="text-[#00ff7f]">Box</span>
          </h2>
          <div className="flex gap-4">
            <Search size={20} color="#00ff7f" className="cursor-pointer" />
            <MoreVertical size={20} color="#00ff7f" className="cursor-pointer" />
          </div>
        </div>

        {/* Search */}
        <div className="p-4 bg-[#0f0f0f] border-b border-[#1a1a1a] relative">
          <Search size={16} color="#666" className="absolute left-8 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full py-2.5 pl-10 pr-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white text-sm outline-none"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, i) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(i)}
              className={`flex p-4 cursor-pointer gap-3 transition-all ${
                selectedChat === i ? 'bg-[#00ff7f]/10 border-l-[3px] border-l-[#00ff7f]' : 'border-l-[3px] border-l-transparent'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00ff7f] to-[#00cc66] flex items-center justify-center text-black font-bold text-base flex-shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <span className="text-white font-semibold text-[15px]">{chat.name}</span>
                  <span className="text-[#666] text-xs">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#999] text-sm truncate">{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="bg-[#00ff7f] text-black rounded-xl px-2 py-0.5 text-[11px] font-bold min-w-[20px] text-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col bg-[#050505] min-w-0">
        {/* Chat Header */}
        <div className="p-4 bg-[#0f0f0f] border-b border-[#1a1a1a] flex justify-between items-center">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-transparent border-none text-[#00ff7f] cursor-pointer p-1 flex items-center flex-shrink-0">
              {sidebarOpen && !isMobile ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00ff7f] to-[#00cc66] flex items-center justify-center text-black font-bold text-base flex-shrink-0">
              {chats[selectedChat].avatar}
            </div>
            <div>
              <div className="text-white font-semibold text-base truncate">{chats[selectedChat].name}</div>
              <div className="text-[#00ff7f] text-xs">online</div>
            </div>
          </div>
          <div className="flex gap-4">
            <Search size={20} color="#00ff7f" className="cursor-pointer" />
            <MoreVertical size={20} color="#00ff7f" className="cursor-pointer" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 max-w-[70%] ${msg.isMine ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`py-2.5 px-4 text-sm break-words rounded-xl ${
                msg.isMine ? 'bg-white text-black border border-[#00ff7f]' : 'bg-[#1a1a1a] text-white'
              }`}>
                {!msg.isMine && <div className="text-xs font-semibold mb-1 text-[#00ff7f]">{msg.sender}</div>}
                <div>{msg.content}</div>
                <div className="text-[10px] mt-1 text-right text-[#666]">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-[#0f0f0f] border-t border-[#1a1a1a] flex gap-2.5 items-center">
          <button className="bg-transparent border-none cursor-pointer p-2 flex items-center flex-shrink-0">
            <Paperclip size={20} color="#00ff7f" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 py-3 px-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[25px] text-white text-sm outline-none min-w-0"
          />
          <button className="bg-transparent border-none cursor-pointer p-2 flex items-center flex-shrink-0">
            <Smile size={20} color="#00ff7f" />
          </button>
          <button onClick={handleSendMessage} className="bg-[#00ff7f] border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer flex-shrink-0">
            <Send size={20} color="#000" />
          </button>
        </div>
      </div>
    </div>
  );
}