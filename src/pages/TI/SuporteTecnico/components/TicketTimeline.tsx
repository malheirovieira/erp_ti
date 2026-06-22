export default function TicketTimeline() {

    const mensagens = [
      {
        autor: 'Gabriel',
        mensagem: 'Servidor não responde.',
        data: '22/06/2026 08:30',
        tipo: 'cliente'
      },
  
      {
        autor: 'Carlos Silva',
        mensagem: 'Estamos verificando.',
        data: '22/06/2026 08:45',
        tipo: 'admin'
      }
    ];
  
    return (
      <div className="space-y-4">
  
        {mensagens.map((msg, index) => (
  
          <div
            key={index}
            className={`flex ${
              msg.tipo === 'cliente'
                ? 'justify-start'
                : 'justify-end'
            }`}
          >
  
            <div className="max-w-[75%] bg-gray-100 rounded-2xl p-4">
  
              <div className="flex justify-between mb-2 gap-4">
  
                <span className="font-semibold">
                  {msg.autor}
                </span>
  
                <span className="text-xs text-gray-500">
                  {msg.data}
                </span>
  
              </div>
  
              <p>{msg.mensagem}</p>
  
            </div>
  
          </div>
  
        ))}
  
      </div>
    );
  }