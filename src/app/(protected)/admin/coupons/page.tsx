"use client";

import {
  File,
  Home,
  LineChart,
  MoreHorizontal,
  Package,
  Package2,
  PlusCircle,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "~/hooks/use-toast";
import { Coupon } from "~/schemas/coupons-schema";
import { getCouponById, getCoupons } from "~/services/coupon-service";
import { Badge } from "../../../../../src/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../../src/components/ui/breadcrumb";
import { Button } from "../../../../../src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../src/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../src/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../src/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../../src/components/ui/tooltip";
import CreateCoupon from "./create/page";
import EditCoupon from "./edit/page";

export function Dashboard() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [couponData, setCouponData] = useState<Coupon | null>(null);

  const handleCouponSelection = (coupon: Coupon) => {
    if (selectedCoupons.some((selected) => selected.id === coupon.id)) {
      setSelectedCoupons(
        selectedCoupons.filter((selected) => selected.id !== coupon.id),
      );
    } else {
      setSelectedCoupons([...selectedCoupons, coupon]);
    }
  };
  const sendCouponsMutation = useMutation<
    {},
    {},
    { emails: string[]; coupons: Coupon[] }
  >({
    mutationFn: async ({ emails, coupons }) => {
      console.log("Simulando el envío a:", emails);
      console.log("Cupones seleccionados:", coupons);

      return "Cupones enviados";
    },
    onError: () => {
      toast({
        title: "Ocurrió un error al enviar los cupones. Intenta nuevamente. 😔",
      });
    },
    onSuccess: () => {
      toast({
        title: "Cupones enviados exitosamente a los correos proporcionados. 😊",
      });
      setUserEmail("");
      setShowEmailInput(false);
      setSelectedCoupons([]);
    },
  });

  const handleSendCoupons = () => {
    if (!userEmail.trim()) {
      toast({
        title: "Por favor, ingresa al menos un correo electrónico. 😔",
      });
      return;
    }

    const emails = userEmail.split(",").map((email) => email.trim());
    const validEmails = emails.filter((email) => email);

    if (validEmails.length === 0) {
      toast({
        title: "Ingresa al menos un correo electrónico válido. 😔",
      });
      return;
    }

    console.log("Enviando a:", validEmails);
    console.log("Cupones seleccionados:", selectedCoupons);

    sendCouponsMutation.mutate({
      emails: validEmails,
      coupons: selectedCoupons,
    });
  };

  const handleEdit = useCallback(async (id: string | number) => {
    try {
      const couponToEdit = await getCouponById(id);

      setCouponData(couponToEdit);
      setShowEditForm(true);
    } catch (error) {
      console.error("Error fetching coupon data", error);
    }
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <div>Cargando cupones...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Coupons</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Coupons</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="expired" className="hidden sm:flex">
                  Expired
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-7 gap-1"
                  onClick={() => setShowEmailInput(!showEmailInput)}
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Send by Email
                  </span>
                </Button>
                {showEmailInput && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter emails"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="h-7 gap-2 rounded border p-2"
                    />
                    <Button
                      size="sm"
                      className="h-7 gap-1"
                      onClick={handleSendCoupons}
                    >
                      Enviar
                    </Button>
                  </div>
                )}
                <div className="relative">
                  <Button
                    size="sm"
                    className="h-7 gap-1"
                    onClick={() => setShowForm(!showForm)}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Coupon
                    </span>
                  </Button>
                  {showForm && (
                    <CreateCoupon onClose={() => setShowForm(false)} />
                  )}
                </div>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Coupons</CardTitle>
                  <CardDescription>
                    Select a coupon and send it via email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Select</TableHead>
                        <TableHead className="text-center">CODE</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">
                          Discount %
                        </TableHead>
                        <TableHead className="text-center">
                          Expiration Date
                        </TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {coupons.map((coupon) => (
                        <TableRow key={coupon.id ?? "default-id"}>
                          <TableCell className="text-center">
                            <div key={coupon.id}>
                              <input
                                type="checkbox"
                                checked={selectedCoupons.some(
                                  (selected) => selected.id === coupon.id,
                                )}
                                onChange={() => handleCouponSelection(coupon)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {coupon.couponCode}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className={
                                coupon.isActive
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                              }
                            >
                              {coupon.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {coupon.discountPercentage}%
                          </TableCell>
                          <TableCell className="hidden text-center md:table-cell">
                            {new Date(
                              coupon.expirationDate,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem key={coupon.id}>
                                  <Button
                                    size="sm"
                                    className="h-7 gap-1"
                                    onClick={() => {
                                      setShowEditForm(!showEditForm);
                                      setCouponData(coupon);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {showEditForm && couponData && (
                              <EditCoupon
                                onClose={() => setShowEditForm(false)}
                                coupon={couponData}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardHeader>
                  <CardTitle>Active Coupons</CardTitle>
                  <CardDescription>
                    Select an active coupon and send it via email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Select</TableHead>
                        <TableHead className="text-center">CODE</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">
                          Discount %
                        </TableHead>
                        <TableHead className="text-center">
                          Expiration Date
                        </TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {coupons
                        .filter(
                          (coupon) =>
                            coupon.isActive &&
                            new Date(coupon.expirationDate) >= new Date(),
                        )
                        .map((coupon) => (
                          <TableRow key={coupon.id ?? "default-id"}>
                            <TableCell className="text-center">
                              <div key={coupon.id}>
                                <input
                                  type="checkbox"
                                  checked={selectedCoupons.some(
                                    (selected) => selected.id === coupon.id,
                                  )}
                                  onChange={() => handleCouponSelection(coupon)}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-medium">
                              {coupon.couponCode}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant="outline"
                                className="bg-green-500 text-white"
                              >
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {coupon.discountPercentage}%
                            </TableCell>
                            <TableCell className="hidden text-center md:table-cell">
                              {new Date(
                                coupon.expirationDate,
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem key={coupon.id}>
                                    <Button
                                      size="sm"
                                      className="h-7 gap-1"
                                      onClick={() => {
                                        setShowEditForm(!showEditForm);
                                        setCouponData(coupon);
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>

                              {showEditForm && couponData && (
                                <EditCoupon
                                  onClose={() => setShowEditForm(false)}
                                  coupon={couponData}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inactive">
              <Card x-chunk="dashboard-06-chunk-2">
                <CardHeader>
                  <CardTitle>Inactive Coupons</CardTitle>
                  <CardDescription>
                    Select an inactive coupon and send it via email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {coupons.length === 0 ? (
                    <p>No coupons available.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center">Select</TableHead>
                          <TableHead className="text-center">CODE</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-center">
                            Discount %
                          </TableHead>
                          <TableHead className="text-center">
                            Expiration Date
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {coupons
                          .filter((coupon) => {
                            return !coupon.isActive;
                          })
                          .map((coupon) => (
                            <TableRow key={coupon.id ?? "default-id"}>
                              <TableCell className="text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedCoupons.some(
                                    (selected) => selected.id === coupon.id,
                                  )}
                                  onChange={() => handleCouponSelection(coupon)}
                                />
                              </TableCell>
                              <TableCell className="text-center font-medium">
                                {coupon.couponCode}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant="outline"
                                  className="bg-red-500 text-white"
                                >
                                  Inactive
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                {coupon.discountPercentage}%
                              </TableCell>
                              <TableCell className="hidden text-center md:table-cell">
                                {new Date(
                                  coupon.expirationDate,
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-center">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem key={coupon.id}>
                                      <Button
                                        size="sm"
                                        className="h-7 gap-1"
                                        onClick={() => {
                                          setShowEditForm(!showEditForm);
                                          setCouponData(coupon);
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                {showEditForm && couponData && (
                                  <EditCoupon
                                    onClose={() => setShowEditForm(false)}
                                    coupon={couponData}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expired">
              <Card x-chunk="dashboard-06-chunk-3">
                <CardHeader>
                  <CardTitle>Expired Coupons</CardTitle>
                  <CardDescription>
                    Select an expired coupon and send it via email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {coupons.length === 0 ? (
                    <p>No coupons available.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center">Select</TableHead>
                          <TableHead className="text-center">CODE</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-center">
                            Discount %
                          </TableHead>
                          <TableHead className="text-center">
                            Expiration Date
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {coupons
                          .filter((coupon) => {
                            const today = new Date();
                            return new Date(coupon.expirationDate) < today;
                          })
                          .map((coupon) => (
                            <TableRow key={coupon.id ?? "default-id"}>
                              <TableCell className="text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedCoupons.some(
                                    (selected) => selected.id === coupon.id,
                                  )}
                                  onChange={() => handleCouponSelection(coupon)}
                                />
                              </TableCell>
                              <TableCell className="text-center font-medium">
                                {coupon.couponCode}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant="outline"
                                  className="bg-red-500 text-white"
                                >
                                  Expired
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                {coupon.discountPercentage}%
                              </TableCell>
                              <TableCell className="hidden text-center md:table-cell">
                                {new Date(
                                  coupon.expirationDate,
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-center">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem key={coupon.id}>
                                      <Button
                                        size="sm"
                                        className="h-7 gap-1"
                                        onClick={() => {
                                          setShowEditForm(!showEditForm);
                                          setCouponData(coupon);
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                {showEditForm && couponData && (
                                  <EditCoupon
                                    onClose={() => setShowEditForm(false)}
                                    coupon={couponData}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
