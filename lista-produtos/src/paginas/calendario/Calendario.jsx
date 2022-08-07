import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 7, 7),
    end: new Date(2022, 7, 8),
  },
  {
    title: "Vacation",
    start: new Date(2022, 7, 7),
    end: new Date(2022, 7, 8),
  },
];

const Calendario = () => {
  const [allEvents, setAllEvents] = useState(events);

  const { messages } = useMemo(
    () => ({
      messages: {
        week: "Semana",
        day: "Dia",
        month: "Mês",
        previous: "voltar",
        next: "próxima",
        today: "hoje",
        agenda: "Lista Completa",
      },
    }),
    []
  );

  return (
    <div className='App'>
      <h1>Calendar</h1>
      <Calendar
        culture={"pt-BR"}
        defaultView='week'
        localizer={localizer}
        events={allEvents}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Calendario;
