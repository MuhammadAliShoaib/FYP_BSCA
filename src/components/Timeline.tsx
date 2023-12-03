import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import CachedIcon from '@mui/icons-material/Cached';
import Image1 from "../assets/Bus.png"

export default function TimeLine() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '15px', textAlign: 'start' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px", borderRadius: '10px' }}>
              <div style={{ display: "inline-flex", justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: "#71A5DE", display: "inline-flex", justifyContent: 'center', alignItems: 'center', padding: '10px', marginRight: '10px', borderRadius: '10px' }}>
                  <CachedIcon color='primary' />
                </div>
                <span className="header3" style={{ color: 'black' }}>Accurate Location</span>
              </div>
              <p style={{ margin: '0', marginTop: '10px', color: 'black' }}>Revolutionizing the Pharma Industry’s Supply Chain Management with  Blockchain Technology to ensures. Dummey text to be changed.
              </p>
            </div>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div>
            <img src={Image1} style={{ width: "50%", height: '50%' }} />
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '15px', textAlign: 'start' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px", borderRadius: '10px' }}>
              <div style={{ display: "inline-flex", justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: "#71A5DE", display: "inline-flex", justifyContent: 'center', alignItems: 'center', padding: '10px', marginRight: '10px', borderRadius: '10px' }}>
                  <CachedIcon color='primary' />
                </div>
                <span className="header3" style={{ color: 'black' }}>Accurate Location</span>
              </div>
              <p style={{ margin: '0', marginTop: '10px', color: 'black' }}>Revolutionizing the Pharma Industry’s Supply Chain Management with  Blockchain Technology to ensures. Dummey text to be changed.
              </p>
            </div>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div>
            <img src={Image1} style={{ width: "50%", height: '50%' }} />
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '15px', textAlign: 'start' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px", borderRadius: '10px' }}>
              <div style={{ display: "inline-flex", justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: "#71A5DE", display: "inline-flex", justifyContent: 'center', alignItems: 'center', padding: '10px', marginRight: '10px', borderRadius: '10px' }}>
                  <CachedIcon color='primary' />
                </div>
                <span className="header3" style={{ color: 'black' }}>Accurate Location</span>
              </div>
              <p style={{ margin: '0', marginTop: '10px', color: 'black' }}>Revolutionizing the Pharma Industry’s Supply Chain Management with  Blockchain Technology to ensures. Dummey text to be changed.
              </p>
            </div>
          </div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><div>
          <img src={Image1} style={{ width: "50%", height: '50%' }} />
        </div></TimelineContent>
      </TimelineItem>
      {/* <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          9:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem> */}
    </Timeline>
  );
}