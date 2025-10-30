import { useState } from 'react';
import donateIcon from '../assets/donate-icon.png';
import homeLatest1 from '../assets/donation/donation1.png';
import homeLatest2 from '../assets/donation/donation2.png';
import paypalIcon from '../assets/donation/payment1.png';
import visaIcon from '../assets/donation/payment2.png';
import debitIcon from '../assets/donation/payment3.png';
import HeroBanner from '../components/HeroBanner';

export default function Donation() {
  const [donationType, setDonationType] = useState('one_time');
  const [amountChoice, setAmountChoice] = useState('');
  const [otherAmount, setOtherAmount] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');

  const [paymentOption, setPaymentOption] = useState('credit_card');
  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const [amountError, setAmountError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const presetAmounts = ['500', '1000', '3000', '5000', '10000', '50000'];

  function onSelectAmount(v) {
    setAmountChoice(v);
    setOtherAmount('');
    setAmountError('');
  }

  function finalAmount() {
    return amountChoice || otherAmount;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const amt = finalAmount();
    if (!amt) {
      setAmountError('Please select or enter an amount.');
      return;
    }
    // Basic payload (for future integration)
    const payload = {
      donationType,
      amount: Number(amt),
      name,
      email,
      mobile,
      state,
      address,
      paymentOption,
      holderName,
      cardNumber,
      expiry,
      cvc,
    };
    console.log('Donation form submitted:', payload);
    setConfirmed(true);
  }

  function resetForm() {
    setDonationType('one_time');
    setAmountChoice('');
    setOtherAmount('');
    setName('');
    setEmail('');
    setMobile('');
    setState('');
    setAddress('');
    setPaymentOption('credit_card');
    setHolderName('');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setAmountError('');
  }

  return (
    <main className="bg-white">
        <HeroBanner title="Donation" />
      {/* Top QR banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-purple-700 text-white rounded-md p-6 md:py-8 px-10 sm:px-32  md:flex justify-between gap-16  md:gap-6 items-center">
            <div className="space-y-2 mb-10 md:mb-0">
              <h3 className="text-lg font-semibold">Scan this QR Code & Pay Securely</h3>
              <p className="text-xs opacity-90">Name : Sakhu Cancer Foundation</p>
              <p className="text-xs opacity-90">Account No : 60594765469</p>
              <p className="text-xs opacity-90">Bank : BANK OF MAHARASHTRA</p>
              <p className="text-xs opacity-90">IFSC Code : MAHB0001052</p>
              <p className="text-xs opacity-90">City : Chhatrapati Sambhajinagar Maharashtra, India.</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 md:w-36 md:h-36 bg-white rounded-md flex items-center justify-center text-black">
                <span className="text-xs">QR Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main donation content */}
      <section className="py-6 ">
        <div className="text-center">
              <h2 className="text-xl md:text-2xl font-thin">Other <span className="font-bold">Payment Options</span></h2>
            </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[1fr_360px] gap-10 items-center justify-center ">
          {/* Left: form */}
          <form className="space-y-8 xl:w-[750px]" onSubmit={handleSubmit}>
            {/* Donation type */}
            <div>
              <h3 className="text-base md:text-lg font-semibold">Donation Information</h3>
              <p className="mt-2 text-sm font-semibold">What type of donation are you making?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { id: 'one_time', label: 'One Time Payment' },
                  { id: 'weekly', label: 'Weekly' },
                  { id: 'monthly', label: 'Monthly' },
                ].map((opt) => (
                  <label key={opt.id} className={`px-4 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm ${donationType === opt.id ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-black'} cursor-pointer`}> 
                    <input
                      type="radio"
                      name="donationType"
                      value={opt.id}
                      required
                      className="sr-only"
                      checked={donationType === opt.id}
                      onChange={() => setDonationType(opt.id)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Amount selection */}
            <div>
              <p className="text-sm font-semibold">How much would you like to donate?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    className={`px-4 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm ${amountChoice === amt ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-black'}`}
                    onClick={() => onSelectAmount(amt)}
                    aria-pressed={amountChoice === amt}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm text-gray-700">Other Amount</label>
                <input
                  type="number"
                  min="1"
                  value={otherAmount}
                  onChange={(e) => { setOtherAmount(e.target.value); setAmountChoice(''); setAmountError(''); }}
                  placeholder="Enter Amount"
                  required={!amountChoice}
                  className="w-60 px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm"
                />
                {/* Hidden required field to ensure amount is present when a preset is chosen */}
                <input type="text" value={amountChoice} readOnly required className="sr-only" aria-hidden="true" />
              </div>
              {amountError ? (
                <p className="mt-2 text-xs text-red-600">{amountError}</p>
              ) : null}
            </div>

            {/* Personal info */}
            <div>
              <h3 className="text-base md:text-lg font-semibold">Personal Information <span className="text-xs">(Donor)</span></h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
                <input type="tel" placeholder="Mobile No" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
                <select value={state} onChange={(e) => setState(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm">
                  <option value="" disabled>State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Delhi">Delhi</option>
                </select>
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="sm:col-span-2 px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
              </div>
            </div>

            {/* Payment option */}
            <div>
              <h3 className="text-base md:text-lg font-semibold">Choose your payment option</h3>
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'paypal', label: 'Paypal', icon: paypalIcon },
                  { id: 'credit_card', label: 'Credit Card', icon: visaIcon },
                  { id: 'debit_card', label: 'Debit Card', icon: debitIcon },
                  { id: 'offline', label: 'Offline Donation' },
                ].map((opt) => (
                <label
                    key={opt.id}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm ${
                        paymentOption === opt.id
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-black'
                    } cursor-pointer`}
                >
                    <input
                        type="radio"
                        name="paymentOption"
                        value={opt.id}
                        required
                        className="sr-only"
                        checked={paymentOption === opt.id}
                        onChange={() => setPaymentOption(opt.id)}
                    />

                    {/* ✅ Only render image if available */}
                    {opt.icon && (
                        <img src={opt.icon} alt={opt.label} className="w-6 h-6" />
                    )}

                    <span className="text-xs md:text-sm">{opt.label}</span>
                    </label>

                ))}
              </div>

              {/* Card details (visible always per spec, all required) */}
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Holder name" value={holderName} onChange={(e) => setHolderName(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
                <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
                <input type="text" placeholder="Expire (mm/yy)" value={expiry} onChange={(e) => setExpiry(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
                <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} required className="px-3 py-2 rounded-md border-[0.2px] border-[#D0D5DD] shadow-sm" />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button type="submit" className="px-5 py-3 rounded-md bg-purple-600 hover:bg-black text-white">Donate Now</button>
            </div>
          </form>

          {/* Right sidebar: donate card + two placeholder images */}
          <aside className="space-y-6 hidden xl:block">
            <div className="bg-indigo-900 text-white rounded-md shadow p-6">
              <h4 className="text-base md:text-lg font-semibold">Help Us Fight Cancer</h4>
              <p className="mt-2 text-xs md:text-sm opacity-90">All donations are welcome. All donations are welcome.</p>
              <div className="mt-4">
                <button className="bg-white px-4 py-2 rounded-md text-black hover:bg-gray-100">Donate</button>
              </div>
            </div>
            <img src={homeLatest1} alt="Placeholder 1" className="w-full h-40 object-cover rounded-md" />
            <img src={homeLatest2} alt="Placeholder 2" className="w-full h-40 object-cover rounded-md" />
          </aside>
        </div>
      </section>

      {/* Confirmation modal */}
      {confirmed && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-md shadow p-6 w-[90%] max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <img src={donateIcon} alt="Donate" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Donation Submitted</h3>
            </div>
            <p className="mt-3 text-sm text-gray-700">Thank you! Your donation details have been submitted.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-md border"
                onClick={() => setConfirmed(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded-md bg-purple-600 text-white"
                onClick={() => { setConfirmed(false); resetForm(); }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}