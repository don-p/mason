import * as React from 'react';
import ColorItemDraggable from './ColorItemDraggable';
import './Main.css';

// Static list of drag source item objects.
const sourceList = [
  {id: 'red', color: '#ff6666', name: 'Red'},
  {id: 'green', color: '#66ff66', name: 'Green'},
  {id: 'blue', color: '#6666ff', name: 'Blue'},
  {id: 'yellow', color: '#ffff66', name: 'Yellow'},
  {id: 'purple', color: '#ff66ff', name: 'Purple'}
];

/**
 * The drag source component.
 */
class Source extends React.Component {

  public render() {
    // Render the array of drag source objects as DOM elements, 
    // via ColorItem component.
    const sources = sourceList.map((source, index) => {
      return <ColorItemDraggable key={source.id} id={source.id} color={source.color} name={source.name}/>
    })

    return (
      <div className="Main-left">
        <div style={{padding: '6px', margin: '3px', fontWeight: 'bold'}}>Drag Sources</div>
        {sources}
      </div>
    );
  }
}

export default Source;
