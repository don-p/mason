import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, DropTarget, DropTargetConnector } from 'react-dnd';
import './ColorItem.css';
import ItemTypes from './DndConstants';
import store from './store';

// export interface IProps {
//   color: string;
//   name: string;
// }

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
}
// const collect = (connect: any, monitor: any) => {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   }
// }

// @DragSource(itemTypes.COLOR, colorSource, collect)
class ColorItem extends React.Component {

  public props: any;
  // private connectDragSource: any;

  constructor(props: any) {
    super(props);
    // this.connectDragSource = connectDragSource;
  }

  public render() {
    return this.props.connectDragSource(
      this.props.connectDropTarget(
      <div className="ColorItem-dragsource" style={{background: this.props.color}}>{this.props.name}</div>
      )
      );
  }
}

const DndColorItem = DropTarget(ItemTypes.COLOR, colorTarget, (connect: DropTargetConnector) => ({
	connectDropTarget: connect.dropTarget(),
}))(ColorItem)
export default DragSource(ItemTypes.COLOR, colorSource, 	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(DndColorItem)