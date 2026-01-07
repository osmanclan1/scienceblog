---
id: batteries
name: Batteries
description: Understanding how batteries work from first principles - the fundamental components and processes of energy storage
quiz:
  questions:
    - question: "What happens to current according to Ohm's law (I = V/R) when resistance approaches zero?"
      type: "multiple-choice"
      options:
        - "Current decreases to zero"
        - "Current increases toward infinity"
        - "Current remains constant"
        - "Voltage becomes negative"
      correctAnswer: "Current increases toward infinity"
      explanation: "According to Ohm's law, as resistance (R) approaches zero, the current (I) increases dramatically. This is why short circuits are dangerous - they create a path of very low resistance, causing extremely high current flow."
    - question: "Why do lithium ions need to flow through the electrolyte during battery discharge?"
      type: "multiple-choice"
      options:
        - "To generate heat"
        - "To prevent charge build-up and maintain internal charge balance"
        - "To increase the battery voltage"
        - "To slow down electron flow"
      correctAnswer: "To prevent charge build-up and maintain internal charge balance"
      explanation: "When electrons leave the anode, it becomes positive, and when they arrive at the cathode, it becomes negative. Without positive lithium ions moving to balance this charge, a massive static charge would build up, creating an opposing electric field that would stop electron flow immediately."
---

# Batteries

From first principles, batteries work in two primary modes: **Charging** and **Discharging** (using power). Traditionally, the way batteries are set up is by using an anode and cathode, a separator, and an electrolyte.

## Components

**Anode**: An anode is a material that easily loses electrons (Oxidation in chemistry). In traditional lithium-ion batteries, this is usually graphite.

**Cathode**: This is a material that easily gains electrons (Reduction). This is typically a lithium metal oxide.

Since one side wants to give electrons and the other wants to receive/gain them, an electric potential or voltage is established, which is key to current flow.

**Electrolyte**: A liquid ion or gel that allows ions to pass through but not electrons.

**Separator**: A thin porous plastic sheet that keeps the anode and cathode from touching each other while allowing electrolyte-soaked ions to flow through its tiny holes.

## How It Works

### Discharging

Lithium atoms in the anode split into a positive lithium ion and a negative electron. The electron is then blocked by the electrolyte, forcing it to move through a device's external circuit (like your phone) to reach the cathode, providing electricity. Simultaneously, the lithium ion travels through the electrolyte to the cathode to maintain the battery's internal charge balance.

### Charging

An external power source (like your wall charger) applies a higher voltage that "pushes" the electrons back the other way. This forces the lithium ions to move from the cathode back through the electrolyte and settle back into the graphite anode, storing energy for next time.

## Why Separate Paths?

Now you may be wondering why we need to force the electrons to go down a path separate from the ions, or why the ions need to balance the internal charge.

### Short Circuiting

As for the electrons, the reason is that providing the shorter, easier path through the gel would drastically reduce the amount of resistance the electrons would face. According to Ohm's law:

**I = V/R**

As resistance reaches closer to zero, the current increases toward infinity.

[[Graph:ohms-law]]

This would lead to **short circuiting**, where a rapid, uncontrolled amount of energy is released as heat, rather than useful work.

### Preventing Charge Build-up

As for the reason for ionic flow: when electrons leave the anode, that side of the battery becomes increasingly positive. Simultaneously, as electrons arrive at the cathode, it becomes increasingly negative. Without the movement of positive lithium ions to balance this out, a massive static charge would build up almost instantly. This "charge wall" would create an opposing electric field so strong that it would stop the flow of electrons immediately. Positively charged ions are there to neutralize or balance the net charge of their destination, allowing the current to keep flowing until the chemical supply is exhausted.

[[Graph:battery-discharge]]

