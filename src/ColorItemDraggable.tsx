import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import './ColorItem.css';
import ItemTypes from './DndConstants';

export interface IProps {
  color: string;
  id: string;
  name: string;
}

// DnD drag source handling.
const colorSource = {
  beginDrag(props: any) {
    return {
      color: props.color,
      id: props.id,
      name: props.name
    };
  }
};


class ColorItemDraggable extends React.Component<IProps> {

  public props: any;

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return this.props.connectDragSource(
      <div className="ColorItem draggable" style={{background: this.props.color}}>{this.props.name}</div>
    );
  }
}

export default DragSource(ItemTypes.COLOR, colorSource, 	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(ColorItemDraggable)