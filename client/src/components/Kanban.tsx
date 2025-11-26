import { motion } from "framer-motion";
import { useState } from "react";

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  opportunityValue?: string;
  assignee?: string;
  assigneeInitials?: string;
  assigneeColor?: string;
}

interface KanbanProps {
  columns: KanbanColumn[];
  onColumnsChange?: (columns: KanbanColumn[]) => void;
  editable?: boolean;
}

export function Kanban({ columns, onColumnsChange, editable = false }: KanbanProps) {
  const [localColumns, setLocalColumns] = useState(columns);

  const handleAddColumn = () => {
    if (!editable) return;
    const newColumn: KanbanColumn = {
      id: `col-${Date.now()}`,
      title: "Nova Coluna",
      cards: [],
    };
    const updated = [...localColumns, newColumn];
    setLocalColumns(updated);
    onColumnsChange?.(updated);
  };

  const handleDeleteColumn = (columnId: string) => {
    if (!editable) return;
    const updated = localColumns.filter((col) => col.id !== columnId);
    setLocalColumns(updated);
    onColumnsChange?.(updated);
  };

  const handleRenameColumn = (columnId: string, newTitle: string) => {
    if (!editable) return;
    const updated = localColumns.map((col) =>
      col.id === columnId ? { ...col, title: newTitle } : col
    );
    setLocalColumns(updated);
    onColumnsChange?.(updated);
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-min px-4">
        {localColumns.map((column) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 w-80 bg-card border border-border rounded-lg p-4 shadow-lg"
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              {editable ? (
                <input
                  type="text"
                  value={column.title}
                  onChange={(e) => handleRenameColumn(column.id, e.target.value)}
                  className="flex-1 bg-input border border-border rounded px-2 py-1 text-foreground font-semibold"
                />
              ) : (
                <h3 className="font-semibold text-foreground">{column.title}</h3>
              )}
              {editable && (
                <button
                  onClick={() => handleDeleteColumn(column.id)}
                  className="ml-2 text-red-500 hover:text-red-600 text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {column.cards.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Nenhum card
                </div>
              ) : (
                column.cards.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted p-3 rounded border border-border hover:border-accent transition-colors flex items-start justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{card.title}</p>
                      {card.opportunityValue && (
                        <p className="text-xs text-muted-foreground mt-1">Opportunity Value: {card.opportunityValue}</p>
                      )}
                    </div>
                    {card.assigneeInitials && (
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${card.assigneeColor || "bg-cyan-500"}`}
                        title={card.assignee}
                      >
                        {card.assigneeInitials}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        ))}

        {/* Add column button */}
        {editable && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddColumn}
            className="flex-shrink-0 w-80 h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
          >
            + Adicionar coluna
          </motion.button>
        )}
      </div>
    </div>
  );
}
