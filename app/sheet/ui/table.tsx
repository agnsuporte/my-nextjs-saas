// import { auth } from "@/auth";
import { fetchFilteredSheets } from "@/actions/sheet/data";
import { calculateTimeDifference, formatDateToLocal, formatTimeToLocal } from "@/lib/utils";
import { DeleteSheet, UpdateSheet } from "./buttons";

const timeDifference = (startTime: string, endTime: string) => {
  let totalHours = 0;
  const start = formatTimeToLocal(startTime);
  const end = formatTimeToLocal(endTime);
  const WORK_HOURS = 8;

  const timeDifferenceNumeric = calculateTimeDifference(start, end, true);

  if (typeof timeDifferenceNumeric === 'number') {
    totalHours = (timeDifferenceNumeric - WORK_HOURS) - 1;
  }  
  
  return totalHours
}

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const table = await fetchFilteredSheets(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  p-2 md:pt-0">
          <div className="md:hidden">
            {table.sheets.map((sheet) => (
              <div
                key={sheet.id}
                className="mb-4 w-full rounded-mdp-4 border-b"
              >
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{sheet.local}</p>
                    </div>
                  </div>
                  <span>{timeDifference(sheet.start_time, sheet.end_work)}</span>
                </div>
                <div className="flex w-full items-center justify-between pt-4 mb-4">
                  <div>
                    <p className="flex flex-col w-full items-center text-xl font-medium">
                      <span>
                        {formatTimeToLocal(sheet.start_time)} /{" "}
                        {formatTimeToLocal(sheet.end_time)}
                      </span>
                      <span>
                        {formatTimeToLocal(sheet.return_lunch)} /{" "}
                        {formatTimeToLocal(sheet.end_work)}
                      </span>
                    </p>
                    <p>{formatDateToLocal(sheet.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSheet id={sheet.id} />
                    <DeleteSheet id={sheet.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full  md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Local
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Jornada
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Extras
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {table.sheets.map((sheet) => (
                <tr
                  key={sheet.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{sheet.local}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(sheet.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTimeToLocal(sheet.start_time)} /{" "}
                    {formatTimeToLocal(sheet.end_time)} -
                    {formatTimeToLocal(sheet.return_lunch)} /{" "}
                    {formatTimeToLocal(sheet.end_work)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">

                    {timeDifference(sheet.start_time, sheet.end_work)}

                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSheet id={sheet.id} />
                      <DeleteSheet id={sheet.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
