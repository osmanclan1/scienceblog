---
title: Magnetic Levitation
date: 2024-12-30T00:00:00.000Z
topic: Physics
excerpt: Exploring how maglev trains use powerful magnets to levitate, propel, and guide trains at incredible speeds.
requiredTopics: ["lorentz-force"]
quiz:
  questions:
    - question: "What is the primary force used in magnetic levitation systems?"
      type: "multiple-choice"
      options:
        - "Gravitational force"
        - "Lorentz force"
        - "Electrostatic force"
        - "Frictional force"
      correctAnswer: "Lorentz force"
      explanation: "Magnetic levitation systems primarily use the Lorentz force, which describes how charged particles interact with electric and magnetic fields."
    - question: "Why does Japan's Chūō Shinkansen use superconducting magnets cooled to near absolute zero?"
      type: "multiple-choice"
      options:
        - "To reduce the weight of the train"
        - "To create zero electrical resistance, enabling incredibly strong magnetic fields with minimal energy loss"
        - "To make the magnets more visible"
        - "To increase the train's speed through aerodynamic benefits"
      correctAnswer: "To create zero electrical resistance, enabling incredibly strong magnetic fields with minimal energy loss"
      explanation: "Superconductivity eliminates electrical resistance, allowing for much stronger magnetic fields and more efficient operation, making them ideal for high-speed maglev trains."
---

Let's start with a definition. **Magnetic levitation** is a transportation system that uses powerful magnets to lift trains, propel them forward or backward, and guide them to keep them on track.

## How Does Maglev Work?

As I mentioned earlier, there are 3 core functions that we use powerful magnets to help us solve: **Levitation**, **Propulsion**, and **Alignment**.

## Levitation

For levitation, there are 2 different strategies: **Electromagnetic Suspension (EMS)** and **Electrodynamic Suspension (EDS)**. Both work primarily through the **Lorentz force**.

### Electromagnetic Suspension (EMS)

Using this force, engineers equipped strong magnets on the train's underside which subsequently are attracted upward toward a steel rail. This pulls the train up from the ground, leaving a gap of about 10-15 mm.

While this method can allow trains to levitate while still, they are unstable, requiring the development of high-speed sensors that must adjust the current thousands of times per second to ensure the train does not touch the rail.

### Electrodynamic Suspension (EDS)

Electrodynamic Suspension or EDS uses repulsion instead of attraction. The movement of the train's magnets past conductive loops in the track induces a current, which in turn creates a repulsive magnetic field that pushes the train up.

This method requires the train to have a "takeoff" speed but brings the crucial benefit of stability, as the train is naturally shielded from touching the rails.

## Propulsion

There are also two different systems that have been used for moving the train forward: **Linear Synchronous Motor (LSM)** and **Linear Induction Motors (LIM)**.

Both of these techniques involve the idea of using magnets ahead of the train on the track to attract the magnets on the train, and magnets behind the train to repel its magnets.

### Linear Synchronous Motor (LSM)

A computer uses high-speed sensors to know exactly when the magnet is directly over a coil. This is critical for the "Synchronous" part of LSM:

1. **Pull Phase**: While the magnet is approaching Coil A, the computer keeps it as a South pole to pull it in.
2. **The Flip**: The millisecond the magnet passes the center of the coil, the computer reverses the current.
3. **Push Phase**: That same Coil A instantly becomes a North pole, pushing the magnet away from behind to keep it moving forward.

### Linear Induction Motor (LIM)

LIM is similar except for this key difference: the mover or train does not have its own magnets; instead, it uses a simple sheet of conductive metal. As the magnetic field interacts with the metal plate, it creates a changing magnetic environment. According to Faraday's law, this change in magnetic flux induces swirling electrical currents called **Eddy currents** inside the metal plate.

These currents then start to produce their own magnetic field that always opposes the one that created it (Lenz's law). These two magnetic fields repel each other, propelling the train forward.

A key disadvantage in LIM is the need for the train/mover to be moving slower relative to the magnetic "wave" across the track. If both were moving at the same speed, that would result in a constant magnetic flux (i.e., no changing magnetic environment), which, as explained before, is crucial to the process of propulsion.

Therefore, trains utilizing LIM must account for this. This is formally called the "Slip." This becomes sort of a paradox: if the train has more load, thereby making it initially move slower, it produces a greater thrust, causing it to move forward faster.

## Alignment

Alignment also has 2 recognized techniques: **Mechanical guidance** and **Electromagnetic Guidance**.

### Mechanical Guidance

- **Linear Guides and Rails**: The mover is attached to carriages that slide or roll along precision-machined steel rails.
- **Support Bearings**: High-precision bearings (ball or roller) ensure that the air gap—the tiny space between the magnets and coils (that carry the current)—remains consistent. If this gap changes, the motor's power becomes uneven or the parts could physically crash.

### Electromagnetic Guidance

In high-speed maglev trains, physical rails are replaced by magnetic forces that "float" and "steer" the vehicle.

- **Lateral Attraction/Repulsion**: Electromagnets are placed on the sides of the track and the vehicle. If the train drifts too far to the left, the computer increases the magnetic pull on the right and pushes on the left to center it.
- **The "Null-Flux" Principle**: Some systems use passive loops of wire on the side of the track. If the mover is perfectly centered, no current flows. If it drifts off-center, the mover's magnets "induce" a current in the track loops that automatically pushes it back toward the middle (Lenz's Law).

## Japan's Chūō Shinkansen

Japan's Chūō Shinkansen maglev train adopts:
- **EDS** for levitation
- **LSM** for propulsion
- **Electromagnetic approach** for alignment

The most crucial difference is that the train carries powerful electromagnets made of a niobium-titanium alloy, which are cooled to near absolute zero (-269°C or -452°F) using liquid helium. At this temperature, the material has zero electrical resistance (superconductivity), creating an incredibly strong magnetic field with very little energy loss.

This superconducting technology allows the train to achieve speeds of over 600 km/h (373 mph), making it one of the fastest trains in the world.

