import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

export default function TicketChatInput() {

  const [message, setMessage] = useState('');

  return (
    <div className="border-t p-4">

      <div className="flex gap-3">

        <button className="text-gray-500">
          <Paperclip />
        </button>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua resposta..."
          className="flex-1 border rounded-full px-4 py-2"
        />

        <button className="bg-orange-600 text-white p-3 rounded-full">
          <Send size={18} />
        </button>

      </div>

    </div>
  );
}