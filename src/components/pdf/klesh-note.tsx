import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Mail, MapPin, Pen, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useKleshNote } from "@/features/klesh/useKleshNote";
import Loader from "@/components//ui/loader";
import ErrorMessage from "@/components//ui/error-message";
import { stripHtmlTags } from "@/lib/pdf";
import React from "react";
import { Input } from "@/components//ui/input";
import { useUpdateKleshNote } from "@/features/klesh/useUpdateKleshNote";

function KleshNote() {
  const { isLoading, kleshNote } = useKleshNote();
  const { isUpdating, updateKleshNote } = useUpdateKleshNote();

  const pdfRef = useRef<HTMLDivElement>(null);
  const [kleshNO, setKleshNO] = useState(kleshNote?.NO);

  if (isLoading) {
    return (
      <div className="h-full w-full grid items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!kleshNote) {
    return (
      <div className="h-full w-full grid items-center">
        <ErrorMessage message="Failed getting Klesh note" goBack />
      </div>
    );
  }

  async function handleClick() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2pdf = (await import("html2pdf.js")).default as any;

    if (!pdfRef.current) return;

    const element = pdfRef.current;
    const options = {
      margin: [10, 10, 10, 10],
      filename: `klesh-${kleshNote.NO}.pdf`,
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(options).from(element).save();
  }

  const rawText = stripHtmlTags(kleshNote.note);
  const textChunks = rawText.match(/.{1,2000}/g) || [];

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <div className="flex gap-2 p-4 justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/klesh-notes">
            <ArrowLeft /> Back to Klesh Notes
          </Link>
        </Button>

        <Button size="sm" onClick={handleClick}>
          <Download /> Download Klesh
        </Button>
      </div>

      <Card className="p-0 border-0 shadow-none min-h-[800px]" ref={pdfRef}>
        <CardContent className="space-y-6">
          <div
            className="text-right leading-relaxed break-words"
            dir="rtl"
            lang="ku"
          >
            {textChunks.map((chunk, index) => (
              <React.Fragment key={index}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 text-right">
                      <p className="text-xl font-bold">شرکە جوانی بالک</p>
                      <p className="text-lg">للتجارة العامة / المحدودة</p>
                    </div>

                    <img
                      src="/jwani-balak-logo.jpg"
                      alt="Jwani Balak Logo"
                      className="w-40"
                    />

                    <div className="space-y-2 text-right">
                      <p className="text-xl font-bold">کۆمپانیای جوانی باڵەک</p>
                      <p className="text-lg">بۆ بازرگانی گشتی / سنوردار</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[4px] flex">
                  <div className="bg-red-500 h-full flex-1" />
                  <div className="bg-black/60 h-full flex-1" />
                  <div className="bg-red-500 h-full flex-1" />
                </div>

                <div className="space-y-2 mt-2 mb-2">
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold">No : {kleshNote.NO}</p>

                    <div className="flex gap-1" data-html2canvas-ignore="true">
                      <Input
                        type="text"
                        value={kleshNO}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(Number(value)) && value.length <= 20) {
                            setKleshNO(Number(value));
                          }
                        }}
                        disabled={isUpdating}
                      />

                      <Button
                        variant="outline"
                        onClick={() => {
                          const updatedKleshNote = { NO: kleshNO };
                          updateKleshNote({
                            kleshNoteId: kleshNote._id,
                            updatedKleshNote,
                          });
                        }}
                        disabled={isUpdating}
                      >
                        <Pen /> Edit
                      </Button>
                    </div>
                  </div>

                  <p className="font-semibold">
                    Date:
                    {` ${new Date().getFullYear()}/${
                      new Date().getMonth() + 1
                    }/${new Date().getDate()}`}
                  </p>
                </div>

                <div className="min-h-[700px] flex flex-col justify-between">
                  <p>{chunk}</p>

                  <div className="flex mt-auto gap-2 justify-between">
                    <div className="flex gap-2 items-center">
                      <Mail className="w-5 h-5 text-red-500" />
                      jwanibalakco@gmail.com
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-red-500" />
                      <div>
                        <p>+964 750 990 4445</p>
                        <p>+964 770 990 4445</p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <MapPin className="w-5 h-5 text-red-500" />
                      Slemani / Aqary / Park Tower
                    </div>
                  </div>

                  <div className="w-full h-12 flex">
                    <div className="bg-red-400 h-full flex-1" />
                    <div className="bg-red-500 h-full flex-1" />
                    <div className="bg-red-600 h-full flex-1" />
                    <div className="bg-red-700 h-full flex-1" />
                    <div className="bg-red-800 h-full flex-1" />
                    <div className="bg-red-900 h-full flex-1" />
                  </div>
                </div>

                {index < textChunks.length - 1 && (
                  <div
                    className="html2pdf__page-break"
                    style={{ pageBreakAfter: "always" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default KleshNote;
