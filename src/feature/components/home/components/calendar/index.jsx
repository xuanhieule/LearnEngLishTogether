import React from 'react';

//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
class Calendar extends React.Component {
  
  render() {
     // Event Render Function To Get Images and Titles
     function renderEventContent(eventInfo) {
      return (
        <div>
        <p>{eventInfo.event.title}</p>
        <img className="eventimage" src={eventInfo.event.url} />
        </div>
      )
    }
    return (
<div className="maincontainer">
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
         eventContent={renderEventContent}
        events={[
          { title: 'Chia sẻ cách học nghe hiệu quả', date: '2021-04-09',  },
          { title: 'Chia sẻ cách học nghe hiệu quả', date: '2021-04-10', }
        ]}
      />
</div>
)
};
}
export default Calendar;