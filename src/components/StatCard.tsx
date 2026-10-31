import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  tone: 'blue' | 'purple' | 'orange' | 'green';
  note: string;
  noteType: 'positive' | 'warning';
}

/**
 * Tarjeta reutilizable para mostrar estadísticas del inventario.
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  tone,
  note,
  noteType,
}) => {
  return (
    <article className="stat-card">
      <div className="stat-heading">
        <span>{title}</span>
        <div className={`stat-icon ${tone}`}>
          {icon}
        </div>
      </div>

      <strong className="stat-number">{value}</strong>

      <p className={`stat-note ${noteType}`}>
        {note}
      </p>
    </article>
  );
};

export default StatCard;