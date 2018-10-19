import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './Main.css';
import Source from './Source';
import Target from './Target';

class Main extends React.Component {
  public render() {
    return (
      <div className="Main">
        <Source/>
        <Target/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Main);
