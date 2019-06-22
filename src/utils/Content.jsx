import React from "react";
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {LoadingOverlay} from '../app-ui/src';
import {ErrorBoundary} from '../app-error/src';

const PureComp = (props) => {

  const {id, className, Header, Footer, sections} = props
  const {setSection, sectionState, mode, loading} = props;
  const {setSectionLocal, sectionStateLocal} = props;

  const sectionKeys = _.keys(sections);
  let currentSection = sectionKeys[0]

  if (sectionState) {
    currentSection = sectionState.section;
  } else {
    currentSection = sectionStateLocal.section;
  }

  currentSection = sections[currentSection]
    ? currentSection
    : sectionKeys[0];

  const SelectedContent = sections[currentSection].content;

  let content = null;
  if (mode === "minimized") {
    content = Header && <div className="card-header">
      <Header {...props}></Header>
    </div>
  } else {
    content = <React.Fragment>
      <div className="card-header">
        {Header && <Header {...props}></Header>}

        <ul className="nav navbar-sm nav-tabs card-header-tabs">
          {
            sectionKeys.map((k, i) => {
              const Label = sections[k].label;
              return <li key={i} className="nav-item">
                <a onClick={e => {
                    e.preventDefault();
                    setSectionLocal(k)
                    setSection && setSection(k);
                  }} className={"nav-link " + (
                    currentSection === k
                    ? 'active'
                    : '')} href="#">
                  <Label {...props}></Label>
                </a>
              </li>;
            })
          }
        </ul>

      </div>
      <SelectedContent {...props}></SelectedContent>
      {
        Footer && (<div className="card-footer">
          <Footer {
            ...props
          }></Footer>
        </div>)
      }
    </React.Fragment>
  }

  return <div className={className}>

    <div id={id} className={"card "}>
      <LoadingOverlay loading={loading}/>
      <ErrorBoundary>
        {content}
      </ErrorBoundary>
    </div>
  </div>
}

const Comp = compose(
/**/
withStateHandlers(() => ({sectionStateLocal: {}}), {
  setSectionLocal: ({}) => (sec) => ({
    sectionStateLocal: {
      section: sec
    }
  })
})
/**/)(PureComp);

export {
  Comp as Content
}
