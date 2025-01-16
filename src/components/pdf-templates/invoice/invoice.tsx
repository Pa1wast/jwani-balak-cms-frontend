import { Link, useParams } from 'react-router-dom';
import { styles } from '@/components/pdf-templates/invoice/styles';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Download, Hexagon, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { invoices } from '@/pages/invoices';
import { useRef } from 'react';

function Invoice() {
  const { invoiceId } = useParams();
  const invoice = invoices.find(invoice => invoice.id === Number(invoiceId));
  const pdfRef = useRef(null);

  async function handleClick() {
    const html2pdf = (await import('html2pdf.js')).default;

    if (!pdfRef) return;

    const element = pdfRef.current;
    const options = {
      margin: 0,
      filename: `invoice-${invoiceId}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(options).from(element).save();
  }

  return (
    <div className="w-max mx-auto relative">
      <div className=" flex gap-2 top-2 left-2 p-4 ml-auto justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/invoices">
            <ArrowLeft /> Back to invoices
          </Link>
        </Button>

        <Button size="sm" onClick={handleClick}>
          <Download /> Download invoice
        </Button>
      </div>

      <Card className="p-0 w-full flex flex-col  border-0 shadow-none" ref={pdfRef}>
        <CardHeader className="space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <p className="text-xl font-bold text-right">شرکە جوانی بالک</p>
              <p className="text-lg text-right">للتجارة العامة / المحدودة</p>
            </div>

            <Hexagon className="size-28 text-red-500" />

            <div className="space-y-2">
              <p className="text-xl font-bold text-right">کۆمپانیای جوانی باڵەک</p>
              <p className="text-lg text-right">بۆ بازرگانی گشتی / سنوردار</p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex gap-2 items-center">
              <Mail className="size-8 text-red-500" />
              jwanibalakco@gmail.com
            </div>

            <div className="flex items-center gap-2">
              <Phone className="size-8 text-red-500" />
              <div>
                <p>+964 750 990 4445</p>
                <p>+964 770 990 4445</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <MapPin className="size-8 text-red-500" />
              Slemani / Aqary / Park Tower
            </div>
          </div>
        </CardHeader>

        <div className="w-full h-[4px] flex">
          <div className="bg-red-500 h-full flex-1" />
          <div className="bg-black/60 h-full flex-1" />
          <div className="bg-red-500 h-full flex-1" />
        </div>

        <CardContent className="space-y-0">
          <div className="p-6 flex flex-row justify-between items-end">
            <div className="space-y-2 ">
              <p>No : {invoiceId}</p>
              <p>
                Date:
                {` ${new Date().getFullYear()}/${
                  new Date().getMonth() + 1
                }/${new Date().getDate()}`}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-lg">{invoice.to}</p>
              <p className="text-xl font-bold">: بەڕێز </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 ">
            <div className="flex gap-1 h-[582px]">
              <div className="flex flex-col flex-[20%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">کۆ</p>
                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                </div>
              </div>

              <div className="flex flex-col flex-[20%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">نرخ</p>
                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                </div>
              </div>

              <div className="flex flex-col flex-[20%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">دانە</p>
                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                </div>
              </div>

              <div className="flex flex-col flex-[40%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">جۆر</p>
                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                  <p>{invoice.pricePerUniT}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-[1px] self-end w-full">
              <p className="text-right p-2 border flex-[20%]"></p>
              <p className="text-right font-bold text-lg p-2 border flex-[80%]">: کۆی گشتی</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-around space-y-0 mb-8">
          <p className="text-xl font-semibold">فرۆشیار</p>
          <p className="text-xl font-semibold">کریار</p>
        </CardFooter>
        <div className="w-full h-12 flex">
          <div className="bg-red-400 h-full flex-1" />
          <div className="bg-red-500 h-full flex-1" />
          <div className="bg-red-600 h-full flex-1" />
          <div className="bg-red-700 h-full flex-1" />
          <div className="bg-red-800 h-full flex-1" />
          <div className="bg-red-900 h-full flex-1" />
        </div>
      </Card>
    </div>
  );
}

export default Invoice;
