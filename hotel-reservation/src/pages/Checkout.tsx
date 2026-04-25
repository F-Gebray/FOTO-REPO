import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { clearBooking } from '../store/bookingSlice';
import { mockHotels } from '../lib/mockData';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';

const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone number is required' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Must be 16 digits' }),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'MM/YY exactly' }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: '3 or 4 digits' }),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const currentBooking = useSelector((state: RootState) => state.booking.currentBooking);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  
  const hotel = mockHotels.find(h => h.id === currentBooking.hotelId);
  const room = hotel?.roomTypes.find(r => r.id === currentBooking.roomType);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useReactHookForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema)
  });

  if (!hotel && !success) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <h2 className="text-2xl font-bold mb-4">No active booking</h2>
        <Link to="/"><Button>Explore Hotels</Button></Link>
      </div>
    );
  }

  const onSubmit = async (_data: CheckoutForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    dispatch(clearBooking());
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 lg:py-32 flex-1">
        <div className="bg-primary/10 text-primary p-6 rounded-full mb-8">
          <CheckCircle className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">Booking Confirmed!</h1>
        <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
          Your reservation is successfully processed. A confirmation email has been sent.
        </p>
        <Link to="/">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 w-full flex flex-col md:flex-row gap-12">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Complete your booking</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <section className="bg-card border border-border p-6 sm:p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">First Name</label>
                <Input {...register('firstName')} placeholder="John" className={errors.firstName ? 'border-red-500' : ''} />
                {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Last Name</label>
                <Input {...register('lastName')} placeholder="Doe" className={errors.lastName ? 'border-red-500' : ''} />
                {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input {...register('email')} placeholder="john@example.com" className={errors.email ? 'border-red-500' : ''} />
                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone Number</label>
                <Input {...register('phone')} placeholder="+1 234 567 890" className={errors.phone ? 'border-red-500' : ''} />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
              </div>
            </div>
          </section>

          <section className="bg-card border border-border p-6 sm:p-8 rounded-3xl">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Card Number (Mock Data)</label>
                <Input {...register('cardNumber')} placeholder="1234567890123456" maxLength={16} className={errors.cardNumber ? 'border-red-500' : ''} />
                {errors.cardNumber && <span className="text-xs text-red-500">{errors.cardNumber.message}</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Expiry</label>
                  <Input {...register('expiry')} placeholder="MM/YY" maxLength={5} className={errors.expiry ? 'border-red-500' : ''} />
                  {errors.expiry && <span className="text-xs text-red-500">{errors.expiry.message}</span>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">CVV</label>
                  <Input {...register('cvv')} type="password" placeholder="123" maxLength={4} className={errors.cvv ? 'border-red-500' : ''} />
                  {errors.cvv && <span className="text-xs text-red-500">{errors.cvv.message}</span>}
                </div>
              </div>
            </div>
          </section>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full text-lg h-14 rounded-xl">
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </form>
      </div>

      <div className="w-full md:w-[380px] shrink-0">
        <div className="bg-card border border-border rounded-3xl p-6 sticky top-28">
           <h3 className="text-lg font-bold mb-4">Reservation Summary</h3>
           {hotel && (
             <div className="flex flex-col">
               <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-xl mb-4" />
               <h4 className="font-semibold text-lg">{hotel.name}</h4>
               <p className="text-muted-foreground text-sm mb-4">{hotel.location}</p>
               
               <div className="border-t border-b border-border py-4 mb-4 text-sm flex flex-col gap-2">
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Dates</span>
                   <span className="font-medium whitespace-nowrap">
                     {currentBooking.checkIn ? new Date(currentBooking.checkIn).toLocaleDateString() : ''} - {currentBooking.checkOut ? new Date(currentBooking.checkOut).toLocaleDateString() : ''}
                   </span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Guests</span>
                   <span className="font-medium">{currentBooking.guests}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Room Type</span>
                   <span className="font-medium">{room?.name}</span>
                 </div>
               </div>

               <div className="flex justify-between items-end">
                 <span className="font-semibold">Total Price</span>
                 <span className="text-2xl font-bold">${room?.price || hotel.pricePerNight}</span>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
