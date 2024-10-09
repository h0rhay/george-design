import React, { useEffect } from "react";

const Subscribe = () => {
  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== "undefined") {
      // Dynamically load the PayPal script
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AarpdqbIrHY4b0A-aOzmvDbwZVDBAQKv13OknzmPcT0RjQXqoYoPKHU-1BeDMR2cIkMp8eq9YhHzyuGj&vault=true&intent=subscription";
      script.async = true;
      script.onload = () => {
        // Initialize PayPal Buttons after script loads
        if (window.paypal) {
          window.paypal
            .Buttons({
              style: {
                shape: "rect",
                color: "gold",
                layout: "vertical",
                label: "subscribe",
              },
              createSubscription: function (data, actions) {
                return actions.subscription.create({
                  /* Creates the subscription */
                  plan_id: "P-3WC75109KJ064444NM4DGVSA",
                });
              },
              onApprove: function (data, actions) {
                alert(`Subscription successful! ID: ${data.subscriptionID}`);
              },
            })
            .render("#paypal-button-container-P-3WC75109KJ064444NM4DGVSA");
        }
      };

      // Append the script to the body
      document.body.appendChild(script);

      // Cleanup the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []); // Only run this effect once when the component mounts

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <h1 style={{fontSize:'2rem', lineHeight: '1', marginBottom: '2rem'}}>Web Maintain package</h1>
      <div style={{ width: "50%", margin: "0 auto" }} id="paypal-button-container-P-3WC75109KJ064444NM4DGVSA"></div>
    </div>
  );
};

export default Subscribe;
