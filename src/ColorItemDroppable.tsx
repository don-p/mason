import * as React from 'react';
import { DropTarget, DropTargetConnector } from 'react-dnd';
import './ColorItem.css';
import ItemTypes from './DndConstants';
import store from './store';

export interface IProps {
  color: string;
  id: string;
  name: string;
}

// DnD drop target handling.
const colorTarget = {
	drop(props: any, monitor: any, component: any) {
    // Get the dropped item object sent from the source.
    const state = store.getState();
    const found = state.colorList.find((listItem: any) => {
      return listItem.id === props.id
    });
    const idx = state.colorList.indexOf(found);
    const item:any = monitor.getItem();
    // Dispatch a Redux action with the dropped data.
    store.dispatch({type: 'DROP-ORDER', data: item, index: idx});
	},
};

class ColorItemDroppable extends React.Component<IProps> {

  public props: any;

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return this.props.connectDropTarget(
      <div className="ColorItem droppable" style={{background: this.props.color}}>{this.props.name}</div>
    );
  }
}

export default DropTarget(ItemTypes.COLOR, colorTarget, 	(connect: DropTargetConnector) => ({
  connectDropTarget: connect.dropTarget()
}))(ColorItemDroppable)