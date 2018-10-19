import * as React from 'react';
import { DropTarget } from 'react-dnd';
import {connect as Connect} from 'react-redux';
import ColorItem from './ColorItem';
import ItemTypes from './DndConstants';
import './Main.css';
import store from './store';

export interface IProps {
  colorList: any[];
  connectDropTarget: any;
}

// DnD drop target handling.
const colorTarget = {
	drop(props: any, monitor: any, component: any) {
    // Only handle direct drop on Component, ignore drop on children.
    if(!(monitor.didDrop())) {
      // Get the dropped item object sent from the source.
      const item:any = monitor.getItem();
      // Dispatch a Redux action with the dropped data.
      store.dispatch({type: 'DROP', data: item});
    }
	},
}

class Target extends React.Component<IProps> {

  public props: IProps;

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return this.props.connectDropTarget(
      <div className="Main-right">
        <div style={{padding: '6px', margin: '3px', fontWeight: 'bold'}}>Color List</div>

        <div style={{overflowY: 'auto', position: 'relative', height: 'calc(100% - 30px)'}}>
          {
            // Render the dropped items in colorList as ColorItem components.
            this.props.colorList.map((item, index) => {
              return <ColorItem key={index} id={item.id} color={item.color} name={item.name}/>
            })
          }
        </div>
      </div>
    );
  }
}

function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
 }

const mapStateToProps = (state: any, ownProps: any) => 
({
  colorList: state.colorList
});
  
const mapDispatchToProps = (dispatch: any) => 
({});

// Wrap the exported component in the DropTarget interface.
const DndTarget = DropTarget(ItemTypes.COLOR, colorTarget, collect)(Target)
export default Connect(
  mapStateToProps, 
  mapDispatchToProps
)(DndTarget);
