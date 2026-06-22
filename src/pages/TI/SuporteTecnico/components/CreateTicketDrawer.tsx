import { X, Upload } from 'lucide-react';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateTicketDrawer({
  open,
  onClose
}: Props) {

  const [form, setForm] = useState({
    titulo: '',
    categoria: '',
    prioridade: '',
    descricao: ''
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">

      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl">

        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">
            Abrir Chamado
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-4">

          <input
            placeholder="Título"
            className="w-full border rounded-lg p-3"
            value={form.titulo}
            onChange={(e) =>
              setForm({ ...form, titulo: e.target.value })
            }
          />

          <select
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({ ...form, categoria: e.target.value })
            }
          >
            <option>Categoria</option>
            <option>Infraestrutura</option>
            <option>SQL / Banco</option>
            <option>Acesso/Login</option>
            <option>Backup</option>
          </select>

          <select
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({ ...form, prioridade: e.target.value })
            }
          >
            <option>Prioridade</option>
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
            <option>Crítica</option>
          </select>

          <textarea
            rows={6}
            placeholder="Descrição"
            className="w-full border rounded-lg p-3"
            value={form.descricao}
            onChange={(e) =>
              setForm({ ...form, descricao: e.target.value })
            }
          />

          <button className="w-full border rounded-lg p-3 flex items-center justify-center gap-2">
            <Upload size={18} />
            Anexar Arquivo
          </button>

          <button className="w-full bg-orange-600 text-white rounded-lg p-3">
            Abrir Chamado
          </button>

        </div>

      </div>

    </div>
  );
}