/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Download, Edit, Mail, MapPin, Pen, Phone, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { useInvoice } from '@/features/invoice.ts/useInvoice';
import Loader from '@/components/ui/loader';
import ErrorMessage from '@/components//ui/error-message';
import { formatPrice } from '@/lib/price';
import { currencyTypes } from '@/types/transaction';
import { WhatsappShareButton } from 'react-share';
import { formatDate } from '@/lib/date';
import { Invoice as InvoiceType } from '@/types/invoice';
import { useUpdateInvoice } from '@/features/invoice.ts/useUpdateInvoice';
import { Input } from '@/components//ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { useProducts } from '@/features/product/useProducts';
import { ComposedProduct } from '@/types/product';

function Invoice() {
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { isLoading, invoice } = useInvoice();
  const { isUpdating, updateInvoice } = useUpdateInvoice();
  const { isLoading: isLoading2, products } = useProducts();

  const [changedProducts, setChangedProducts] = useState<ComposedProduct[]>([]);

  useEffect(() => {
    if (invoice) setChangedProducts(invoice.transaction.products);
  }, [invoice]);

  const [invoiceNO, setInvoiceNO] = useState(invoice?.NO);

  const totalAmount = invoice?.transaction?.products?.reduce(
    (acc, cur) =>
      invoice.transaction.currency === currencyTypes.USD
        ? (acc += cur.quantity * cur.pricePerUnit * (cur.exchange?.rate ?? 1))
        : (acc += cur.quantity * cur.pricePerUnit),
    0
  );

  const pdfRef = useRef(null);

  async function handleClick() {
    const html2pdf = (await import('html2pdf.js')).default as any;

    if (!pdfRef) return;

    const element = pdfRef.current;
    const options = {
      margin: 0,
      filename: `invoice-${invoice.NO}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(options).from(element).save();
  }

  function handleChangeProduct(productId: string) {
    if (!pricePerUnit || !quantity) return;

    const product = changedProducts.find(p => p._id === productId);

    if (!product) return;

    const filteredProducts = changedProducts.filter(p => p._id !== productId);

    product.pricePerUnit = pricePerUnit;
    product.quantity = quantity;

    setChangedProducts([...filteredProducts, product]);

    setPricePerUnit(0);
    setQuantity(0);
  }

  function getFormattedInvoiceMessage(invoice: InvoiceType): string {
    const products2 = invoice.transaction?.products
      ?.map((product: any, index: number) => {
        return `#${index + 1} - Product: *${
          products.find(p => p._id === product.product)?.productName || 'N/A'
        }*
  Quantity: *${product.quantity}*
  Price Per Unit: *${formatPrice(product.pricePerUnit, currencyTypes.IQD)}*
  Total: *${formatPrice(product.pricePerUnit * product.quantity, currencyTypes.IQD)}*`;
      })
      .join('\n\n');

    return `

*Jwani Balak Company - کۆمپانیای جوانی باڵەک*

--------------------------------------------

 *📄 Invoice Details* ${invoice.NO}

--------------------------------------------

👤 Addressed To: *${invoice.addressedTo}*

💼 Seller: *${invoice.seller}*
🏢 Buyer: *${invoice.buyer}*

📅 Date: ${formatDate(invoice.createdAt)}

----------------------

${products2}

----------------------

💵 Total Amount: *${formatPrice(totalAmount, invoice.transaction.currency as currencyTypes)}*

----------------------

📍 Address: Slemani / Aqary / Park Tower
📞 Contact: +964 750 990 4445`;
  }

  if (isLoading || isLoading2) {
    return (
      <div className="h-full w-full grid items-center">
        <Loader />
      </div>
    );
  }

  if (!invoice || !invoice.transaction) {
    return (
      <div className="h-screen w-full grid items-center my-auto">
        <ErrorMessage message="Failed getting invoice information" goBack />
      </div>
    );
  }

  return (
    <div className="w-max mx-auto relative">
      <div className=" flex gap-2 top-2 left-2 p-4 ml-auto justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/invoices">
            <ArrowLeft /> Back to invoices
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <WhatsappShareButton
            url={getFormattedInvoiceMessage(invoice)}
            children={
              <Button size="sm" variant="outline">
                <Share2 /> Share via WhatsApp
              </Button>
            }
            windowWidth={1000}
            windowHeight={800}
          />

          <Button size="sm" onClick={handleClick}>
            <Download /> Download invoice
          </Button>
        </div>
      </div>

      <Card className="p-0 w-full flex flex-col  border-0 shadow-none" ref={pdfRef}>
        <CardHeader className="space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <p className="text-xl font-bold text-right">شرکە جوانی بالک</p>
              <p className="text-lg text-right">للتجارة العامة / المحدودة</p>
            </div>

            <img src="/jwani-balak-logo.jpg" alt="Jwani Balak Logo" className="w-40" />

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
          <div className="p-3 flex flex-col justify-between items-end">
            <div className="space-y-1 mb-2">
              <div className="flex gap-2 items-center">
                <div className="flex gap-1" data-html2canvas-ignore="true">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const updatedInvoice = {
                        _id: invoice._id,
                        NO: invoiceNO,
                      };
                      updateInvoice(updatedInvoice);
                    }}
                    disabled={isUpdating}
                  >
                    <Pen /> Edit
                  </Button>

                  <Input
                    type="text"
                    value={invoiceNO}
                    onChange={e => {
                      const value = e.target.value;
                      if (!isNaN(Number(value)) && value.length <= 20) setInvoiceNO(Number(value));
                    }}
                    disabled={isUpdating}
                  />
                </div>

                <p className="font-medium min-w-max">No : {invoice.NO}</p>
              </div>
              <p className="font-medium ml-auto w-max ">
                Date:
                {` ${new Date().getFullYear()}/${
                  new Date().getMonth() + 1
                }/${new Date().getDate()}`}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-lg font-bold">{invoice.addressedTo}</p>
              <p className="text-xl font-semibold">: بەڕێز</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 ">
            <div className="flex gap-1 h-[430px]">
              <div className="flex flex-col flex-[20%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">کۆ</p>
                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  {changedProducts?.map(product => (
                    <span>
                      {formatPrice(product.pricePerUnit * product.quantity, currencyTypes.IQD)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col flex-[20%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">نرخ</p>
                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  {changedProducts?.map(product => (
                    <span>{formatPrice(product.pricePerUnit, currencyTypes.IQD)}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col flex-[20%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">دانە</p>
                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  {changedProducts?.map(product => (
                    <span>{product.quantity}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col flex-[40%] gap-2">
                <p className="bg-black/80 text-white text-center p-2">جۆر</p>

                <div className="border-[1px] h-full text-center flex flex-col gap-4 p-2">
                  <div className="flex self-center gap-4 justify-center items-center w-full">
                    {changedProducts?.map(product => (
                      <>
                        <span>{products.find(p => p._id === product.product)?.productName}</span>
                        <Dialog data-html2canvas-ignore="true">
                          <DialogTrigger data-html2canvas-ignore="true">
                            <Edit />
                          </DialogTrigger>

                          <DialogContent data-html2canvas-ignore="true">
                            <DialogHeader>
                              <DialogTitle>
                                Change Product (
                                {products.find(p => p._id === product.product)?.productName})
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-1">
                              <Label>Price / Unit ({product.pricePerUnit})</Label>

                              <Input
                                type="text"
                                value={pricePerUnit}
                                onChange={e => {
                                  const value = e.target.value;
                                  if (!isNaN(Number(value)) && value.length <= 20)
                                    setPricePerUnit(Number(value));
                                }}
                              />
                            </div>

                            <div className="space-y-1">
                              <Label>Quantity ({product.quantity})</Label>

                              <Input
                                type="text"
                                value={quantity}
                                onChange={e => {
                                  const value = e.target.value;
                                  if (!isNaN(Number(value)) && value.length <= 20)
                                    setQuantity(Number(value));
                                }}
                              />
                            </div>

                            <Button
                              variant="outline"
                              onClick={() => handleChangeProduct(product._id as string)}
                            >
                              Change
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-[1px] self-end w-full">
              <p className="text-right p-2 border flex-[20%] font-semibold">
                {formatPrice(totalAmount, currencyTypes.IQD)}
              </p>
              <p className="text-right font-bold text-lg p-2 border flex-[80%]">: کۆی گشتی</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-around space-y-0 mb-8">
          <div className="flex gap-1 items-center" dir="rtl" lang="ku">
            <p className="text-xl font-semibold text-secondary-foreground/60">فرۆشیار:</p>
            <p className="text-xl font-bold">{invoice.seller}</p>
          </div>

          <div className="flex gap-1 items-center" dir="rtl" lang="ku">
            <p className="text-xl font-semibold text-secondary-foreground/60">کریار:</p>
            <p className="text-xl font-bold">{invoice.buyer}</p>
          </div>
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
