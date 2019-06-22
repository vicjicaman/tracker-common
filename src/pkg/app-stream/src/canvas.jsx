import React from "react";
import _ from "lodash";
import {Query} from "react-apollo";
import {compose, lifecycle, withProps} from 'recompose';
import {StreamConnector} from './state/connector'
import {StreamQuery} from './queries'
import {LoadingIcon} from 'PKG/app-ui/src'
import {hide as hideInfo} from 'Utils/hide'

const PureStreamCanvas = ({componentid, initStream, realtimeStream, stream: {
    streamid
  }}) => {

  if (!componentid) {
    return <b className="text-danger">INVALID</b>
  }

  if (!realtimeStream) {
    return (<Query query={StreamQuery} variables={{
        streamid
      }}>
      {
        ({loading, error, data}) => {

          const initStreamLabel = <div className="text-center"><LoadingIcon/></div>

          if (!data || loading) {
            return initStreamLabel;
          }

          const InitStream = compose(lifecycle({
            componentDidMount: function() {
              if(data.viewer.system.streams.stream){
                initStream(data.viewer.system.streams.stream);
              }else{
                initStream({streamid, frames:[]});
              }

            }
          }))(() => initStreamLabel)

          return <InitStream/>;
        }
      }
    </Query>)
  }

  const totalFrames = realtimeStream
    ? realtimeStream.frames
    : [];

  return <Terminal componentid={componentid} frames={totalFrames}/>

}

export const StreamCanvas = compose(
/**/
withProps(({componentid}) => ({componentid: componentid.safeId()})),
/**/
StreamConnector,
/****/
lifecycle({

  componentDidMount: function() {

    const {componentid, setStreamCanvasPosition, canvas} = this.props;

    const prevEl = $("#" + componentid);
    prevEl.on("scroll", function(e) {

      if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        const preEl = $("#" + componentid);
        //console.log("current: " + preEl.scrollTop() + " - " + prevEl.prop("scrollHeight"));
        setStreamCanvasPosition(-1);
      }

    });

    if (canvas) {
      if (canvas.position === -1) {
        prevEl.scrollTop(prevEl.prop("scrollHeight"));
      } else {
        prevEl.scrollTop(canvas.position);
      }
      prevEl.scrollTop(prevEl.prop("scrollHeight"));
    }

  },
  //
  componentDidUpdate: function(prevProps) {

    const {componentid, setStreamCanvasPosition, canvas} = this.props; //.replace(/\./g, "_").replace(/\|/g, "_");
    const prevEl = $("#" + componentid);
    const currentPos = $("#" + componentid).scrollTop();

    if (canvas) {
      if (canvas.position === -1) {
        prevEl.scrollTop(prevEl.prop("scrollHeight"));
      } else {
        prevEl.scrollTop(canvas.position);
      }
      prevEl.scrollTop(prevEl.prop("scrollHeight"));
    }
  },
  componentWillUnmount: function() {

    const {componentid, setStreamCanvasPosition} = this.props;
    setStreamCanvasPosition($("#" + componentid).scrollTop());
    //this.props.removeStream(this.props.stream);
    //if (this.props.filters) {
    //  this.props.initList(this.props.filters)
    //}

  }
})
/**/)(PureStreamCanvas);

class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevProps.frames.length !== this.props.frames.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (snapshot !== null) {
      const list = this.listRef.current;

      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    const {componentid, frames} = this.props;

    return (<div id={componentid} ref={this.listRef} className="" style={{
        background: "black",
        minHeight: "100px",
        maxHeight: "320px",
        overflowY: "scroll"
      }}>
      {
        _.map(frames, ({
          frameid,
          data,
          label,
          type,
          addedOn
        }, i) => {
          let classType = "badge-info";
          let classData = "";

          if (type === "out") {
            classType = "badge-secondary";
            classData = "text-light";
          }

          if (type === "info") {
            classType = "badge-info";
            classData = "text-info";
          }

          if (type === "success") {
            classType = "badge-success";
            classData = "text-success";
          }

          if (type === "warning") {
            classType = "badge-warning";
            classData = "text-warning";
          }

          if (type === "error") {
            classType = "badge-danger";
            classData = "text-danger";
          }

          return (<React.Fragment key={i}>
            {
              ( (label && (label.includes("done") || label.includes("started"))) || (type) !== "out") && <span className="d-block">
                  <span className={" badge small " + classType}>{type}</span>{' '}<span className={" badge small badge-info"}>{label}</span>{' '}<span className="text-muted small">frame:{frameid}{' '}{addedOn}</span>
                </span>
            }
            <pre className={" p-0 m-0 d-block "+classData}>{hideInfo(data.trim())}</pre>
          </React.Fragment>);
        })
      }
    </div>);
  }
}
