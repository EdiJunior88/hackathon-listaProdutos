import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  addDays,
  getDate,
  getDay,
  getMonth,
  getYear,
  daysToWeeks,
  eachDayOfInterval,
} from "date-fns";
import { Link } from "react-router-dom";

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

let arrList = [];

const Calendario = () => {
  const [lista, setLista] = useState([]);
  const API_KEY = import.meta.env.VITE_APP_AIRTABLE_API_KEY;

  useEffect(() => {
    arrList = [];
    fetch(
      "https://api.airtable.com/v0/appmzousW9UQxa0xf/Produtos?&filterByFormula=" +
        encodeURI(
          "({id_usuario} = '" + localStorage.getItem("criptografia") + "')",
        ) +
        "&sort" +
        encodeURI("[0][field]=data_criacao") +
        "&sort" +
        encodeURI("[0][direction]=desc"),
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )
      .then((response) => response.json())
      .then((result) => {
        result && setLista(result?.records);
      })
      .catch((error) => console.error("error: ", error));
  }, [API_KEY]);

  if (lista) {
    for (const desc of lista) {
      //-------- Data Inicial
      const data = desc.fields?.data_criacao * 1000;
      const ano = getYear(data);
      const mes = getMonth(data);
      const dia = getDate(data);

      //-------- Encerramento
      const dataEncerramento = desc.fields?.encerramento * 1000;
      const anoEnc = getYear(dataEncerramento);
      const mesEnc = getMonth(dataEncerramento);
      const diaEnc = getDate(dataEncerramento);

      const repetir = desc.fields.repeticao;
      const repetirDia = desc.fields.repeticao_dia;

      const diaTeste = getDay(new Date()) - repetirDia;
      let diaCerto = "";

      if (diaTeste < 0) {
        diaCerto = getDate(new Date(ano, mes, dia + Math.abs(diaTeste)));
      } else {
        diaCerto = getDate(new Date(ano, mes, dia - diaTeste));
      }

      if (isNaN(dataEncerramento)) {
        const quantidadeDiasN = eachDayOfInterval({
          start: new Date(ano, mes, diaCerto),
          end: new Date(2022, 11, 31),
        });

        const resultadoN = daysToWeeks(quantidadeDiasN.length);

        arrList = [
          ...arrList,
          {
            title: desc.fields?.nome,
            start: new Date(ano, mes, diaCerto),
            end: new Date(ano, mes, diaCerto),
          },
        ];

        let cont = 0;
        let result = 0;
        while (cont < resultadoN) {
          cont++;
          const n = 7 * repetir;
          result += n;
          const data = addDays(new Date(ano, mes, diaCerto), result);

          const anoD = getYear(data);
          const mesD = getMonth(data);
          const diaD = getDate(data);

          arrList = [
            ...arrList,
            {
              title: desc.fields?.nome,
              start: new Date(anoD, mesD, diaD),
              end: new Date(anoD, mesD, diaD),
            },
          ];
        }
      } else {
        // Calcula quantos dias faltam até o encerramento
        const quantidadeDias = eachDayOfInterval({
          start: new Date(ano, mes, diaCerto),
          end: new Date(anoEnc, mesEnc, diaEnc),
        });

        // Pega a quantidade de semanas
        const resultado = daysToWeeks(quantidadeDias.length);

        arrList = [
          ...arrList,
          {
            title: desc.fields?.nome,
            start: new Date(ano, mes, diaCerto),
            end: new Date(ano, mes, diaCerto),
          },
        ];

        let cont = 0;
        let result = 0;
        while (cont < resultado) {
          cont++;
          const n = 7 * repetir;
          result += n;
          const data = addDays(new Date(ano, mes, diaCerto), result);

          const anoD = getYear(data);
          const mesD = getMonth(data);
          const diaD = getDate(data);

          arrList = [
            ...arrList,
            {
              title: desc.fields?.nome,
              start: new Date(anoD, mesD, diaD),
              end: new Date(anoD, mesD, diaD),
            },
          ];
        }
      }
    }
  }

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
    [],
  );

  return (
    <div className="App">
      <div className="">
        <h1 className="mt-5">Lista de Compras</h1>
        <Link to="/lista" className="btn btn-warning">
          Voltar
        </Link>
      </div>
      <Calendar
        culture={"pt-BR"}
        defaultView="month"
        localizer={localizer}
        events={arrList}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Calendario;
