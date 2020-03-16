import * as React from 'react';
import styles from './Ccs.module.scss';
import { ICcsProps } from './ICcsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Ccs extends React.Component<any, any, any> {
  constructor(props:any) {
    super(props);

    console.log("-------------------------------------------------------------------------");
    console.log("[ProcurementNavigator.tsx] CONSTRUCTOR",this.props);
    console.log("-------------------------------------------------------------------------");

    // Get the first element and pass it some extra values
    const firstQuestion = this.props.arrayToUse.filter( n => n.questionId == 1 );
    firstQuestion.endText = "";
    firstQuestion.selectedKey = "";

    // Pass a new Object to state and spread the first question
    this.state = {
      tabsDisplay: [ ...firstQuestion ]
    };

    //Bind "this" to the function so that it can use this.state
    // this._onChange = this._onChange.bind(this);
  }

  // For testing purposes. Can be removed.
  public componentDidMount() {
    console.log("-------------------------------------------------------------------------");
    console.log('[ProcurementNavigator.tsx] componentDidMount',this.state);
    console.log("-------------------------------------------------------------------------");
  }

  // For testing purposes. Can be removed.
  public componentDidUpdate() {
    console.log("-------------------------------------------------------------------------");
    console.log('[ProcurementNavigator.tsx] componentDidUpdate',this.state);
    console.log("-------------------------------------------------------------------------");
  }


  public render(): React.ReactElement<ICcsProps> {
    return (
      <div className={ styles.ccs }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>CCS After Hours Activity Form</span>
              <p className={ styles.description }>{escape(this.props.description)}</p>
            </div>
          </div>
        </div>

        <div className={ styles.container }>
          <div className={ styles.row2 }>
            <div className={ styles.column }>
              Test Content
            </div>
          </div>
        </div>
      </div>
    );
  }
}
