import React from "react";
import _ from 'lodash'
import {compose, lifecycle} from 'recompose';
import {ContentConnector} from './ContentConnector';
import {ContentWindowControl} from './ContentWindowControl'
import {ErrorBoundary} from '../../app-error/src';
import {LoadingOverlay} from '../../app-ui/src';

const PureComp = (props) => {

  const {
    componentid,
    className,
    attributes,
    header: Header,
    footer: Footer,
    sections: rawSections,
    window,
    contentClass: defaultContentClass,
    loading,
    mode: initialMode
  } = props;

  if (!componentid) {
    return <b className="text-danger">INVALID</b>
  }

  const {setWindowMode, setSection, component: rawComponent} = props;

  let section = null;
  let mode = initialMode || "restored";

  if (rawComponent) {
    section = rawComponent.section;
    if (rawComponent.mode) {
      mode = rawComponent.mode;
    }
  }

  let contentClass = defaultContentClass || "col-12 col-md-4 col-lg-3";

  if (mode === "minimized") {
    contentClass = "col-6 col-md-3 col-lg-2";
  }
  if (mode === "splited") {
    contentClass = "col-12 col-md-6 col-lg-6";
  }
  if (mode === "maximized") {
    contentClass = "col-12 col-lg-12";
  }

  const sections = [];
  for (const sec of rawSections) {
    const {hide: hideFn} = sec;

    if (!hideFn || (!(hideFn && hideFn(props)))) {
      sections.push(sec);
    }
  }
  let currentSectionIdx = _.findIndex(sections, {sectionid: section})
  if (currentSectionIdx === -1) {
    currentSectionIdx = 0;
  }

  const SelectedContent = sections[currentSectionIdx].content;

  const component = {
    section: sections[currentSectionIdx].sectionid
  };
  // row
  const head = <div className="">
    {
      (window !== false) && <div style={{
            position: "absolute",
            top: 0,
            right: 0
          }}>
          <ContentWindowControl componentid={componentid + "_window_control"} setWindowMode={setWindowMode} mode={mode}/>
        </div>
    }
    {Header && (<Header {...props} componentid={componentid} component={component}></Header>)}
  </div>;

  let content = null;
  if (mode === "minimized") {
    content = <div className="card-header">
      {head}
    </div>
  } else {
    content = <React.Fragment>
      {
        <div className="card-header">

            {Header && head}

            {

              (sections.length > 1) && <ul className="nav navbar-sm nav-tabs card-header-tabs mt-2">
                  {
                    _.map(sections, function(sec, i) {
                      const Label = sec.label;

                      return <li key={i} className="nav-item">
                        <a onClick={e => {
                            e.preventDefault();
                            setSection(sec.sectionid);
                          }} className={"nav-link " + (
                            currentSectionIdx === i
                            ? 'active'
                            : '')} href="#">
                          <Label {...props} component={component}></Label>
                        </a>
                      </li>;
                    })
                  }
                </ul>

            }

          </div>
      }
      <SelectedContent componentid={componentid} {...props} component={component}></SelectedContent>
      {
        Footer && (<div className="card-footer">
          <Footer {
            ...props
          } componentid={componentid} component={component}></Footer>
        </div>)
      }
    </React.Fragment>
  }

  return <div className={(className || "") + " " + contentClass}>

    <div id={componentid.safeId() + "_card"} className={"card "}>
      <LoadingOverlay loading={loading}></LoadingOverlay>

      <ErrorBoundary>
        {content}
      </ErrorBoundary>
    </div>
  </div>
}

const Comp = compose(
/**/
ContentConnector,
/**/)(PureComp);

export {
  Comp as Content
}
