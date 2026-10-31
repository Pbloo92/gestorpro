import React from 'react';
import { IonIcon } from '@ionic/react';

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: string;
  type: 'success' | 'warning';
}

/**
 * Muestra un movimiento reciente del inventario.
 */
const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  time,
  icon,
  type,
}) => {
  return (
    <div className="activity-item">
      <div className={`activity-icon ${type}`}>
        <IonIcon icon={icon} />
      </div>

      <div className="activity-description">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <time>{time}</time>
    </div>
  );
};

export default ActivityItem;