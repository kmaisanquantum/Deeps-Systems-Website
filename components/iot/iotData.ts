import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Antenna,
  Boxes,
  Building2,
  CloudCog,
  Droplets,
  Factory,
  Gauge,
  Headset,
  Layers,
  Leaf,
  MapPinned,
  Network,
  Radar,
  Radio,
  Satellite,
  ShieldCheck,
  Sprout,
  Thermometer,
  Truck,
  Waves,
  Wifi,
  Wrench,
} from 'lucide-react';

export type IotAccent = 'emerald' | 'blue' | 'cyan' | 'amber' | 'violet' | 'teal' | 'sky' | 'rose' | 'indigo';

export type IotTechnologyStatus = 'scoped' | 'planned';

export interface IotListItem {
  title: string;
  description: string;
}

export interface IotTechnology {
  name: string;
  description: string;
  status: IotTechnologyStatus;
}

export interface IotRelated {
  name: string;
  href: string;
  description: string;
}

export interface IotService {
  slug: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  intro: string[];
  problems: IotListItem[];
  capabilities: IotListItem[];
  technologies: IotTechnology[];
  industries: string[];
  howItWorks: IotListItem[];
  benefits: IotListItem[];
  related: IotRelated[];
  icon: LucideIcon;
  accent: IotAccent;
  heroStats: { value: string; label: string }[];
  seoTitle: string;
  seoDescription: string;
}

export const iotAccentStyles: Record<
  IotAccent,
  { badge: string; icon: string; iconSolid: string; gradient: string; border: string; text: string; soft: string; dot: string }
> = {
  emerald: {
    badge: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
    iconSolid: 'bg-emerald-600 text-white',
    gradient: 'from-emerald-600 to-teal-700',
    border: 'hover:border-emerald-500/40',
    text: 'text-emerald-600 dark:text-emerald-300',
    soft: 'bg-emerald-500/5',
    dot: 'bg-emerald-500',
  },
  blue: {
    badge: 'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-300',
    iconSolid: 'bg-blue-600 text-white',
    gradient: 'from-blue-600 to-indigo-700',
    border: 'hover:border-blue-500/40',
    text: 'text-blue-600 dark:text-blue-300',
    soft: 'bg-blue-500/5',
    dot: 'bg-blue-500',
  },
  cyan: {
    badge: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    icon: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300',
    iconSolid: 'bg-cyan-600 text-white',
    gradient: 'from-cyan-600 to-sky-700',
    border: 'hover:border-cyan-500/40',
    text: 'text-cyan-600 dark:text-cyan-300',
    soft: 'bg-cyan-500/5',
    dot: 'bg-cyan-500',
  },
  amber: {
    badge: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
    iconSolid: 'bg-amber-600 text-white',
    gradient: 'from-amber-600 to-orange-700',
    border: 'hover:border-amber-500/40',
    text: 'text-amber-600 dark:text-amber-300',
    soft: 'bg-amber-500/5',
    dot: 'bg-amber-500',
  },
  violet: {
    badge: 'border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300',
    icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-300',
    iconSolid: 'bg-violet-600 text-white',
    gradient: 'from-violet-600 to-purple-700',
    border: 'hover:border-violet-500/40',
    text: 'text-violet-600 dark:text-violet-300',
    soft: 'bg-violet-500/5',
    dot: 'bg-violet-500',
  },
  teal: {
    badge: 'border-teal-500/20 bg-teal-500/10 text-teal-700 dark:text-teal-300',
    icon: 'bg-teal-500/10 text-teal-600 dark:text-teal-300',
    iconSolid: 'bg-teal-600 text-white',
    gradient: 'from-teal-600 to-emerald-700',
    border: 'hover:border-teal-500/40',
    text: 'text-teal-600 dark:text-teal-300',
    soft: 'bg-teal-500/5',
    dot: 'bg-teal-500',
  },
  sky: {
    badge: 'border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300',
    icon: 'bg-sky-500/10 text-sky-600 dark:text-sky-300',
    iconSolid: 'bg-sky-600 text-white',
    gradient: 'from-sky-600 to-blue-700',
    border: 'hover:border-sky-500/40',
    text: 'text-sky-600 dark:text-sky-300',
    soft: 'bg-sky-500/5',
    dot: 'bg-sky-500',
  },
  rose: {
    badge: 'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
    icon: 'bg-rose-500/10 text-rose-600 dark:text-rose-300',
    iconSolid: 'bg-rose-600 text-white',
    gradient: 'from-rose-600 to-red-700',
    border: 'hover:border-rose-500/40',
    text: 'text-rose-600 dark:text-rose-300',
    soft: 'bg-rose-500/5',
    dot: 'bg-rose-500',
  },
  indigo: {
    badge: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
    icon: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300',
    iconSolid: 'bg-indigo-600 text-white',
    gradient: 'from-indigo-600 to-blue-700',
    border: 'hover:border-indigo-500/40',
    text: 'text-indigo-600 dark:text-indigo-300',
    soft: 'bg-indigo-500/5',
    dot: 'bg-indigo-500',
  },
};

export const iotServices: IotService[] = [
  {
    slug: 'deepsconnect',
    number: '01',
    name: 'DeepsConnect',
    category: 'IoT Connectivity & Gateway Solutions',
    tagline: 'From field device to cloud, without the connectivity gaps.',
    summary: 'Gateways, wireless protocols and resilient backhaul that keep remote devices talking.',
    intro: [
      'DeepsConnect is the connectivity foundation of the Deeps Systems IoT portfolio. We design and deploy the gateways, wireless networks and backhaul links that move operational data from sensors and equipment in the field to the platforms where decisions are made.',
      'It is built for sites where fibre is absent, power is inconsistent and a single network path is rarely enough. Our team surveys the site, selects the right mix of protocols and backhaul, then commissions and supports the link so your data keeps moving.',
    ],
    problems: [
      { title: 'Remote sites without reliable networks', description: 'Mines, plantations and utility sites often sit beyond the reach of fibre and dependable mobile coverage.' },
      { title: 'Devices that speak different protocols', description: 'LoRaWAN sensors, BLE tags, Zigbee devices and industrial equipment rarely share a common network.' },
      { title: 'Costly site visits', description: 'Every unplanned trip to reset a gateway or diagnose a link erodes the value of monitoring.' },
      { title: 'Single points of failure', description: 'One backhaul link is one outage away from losing visibility of critical assets.' },
    ],
    capabilities: [
      { title: 'LoRaWAN connectivity', description: 'Long-range, low-power sensor networks that cover wide sites without relying on mobile coverage.' },
      { title: 'LoRaWAN gateway deployment', description: 'Site survey, gateway placement, antenna planning and commissioning as one coordinated service.' },
      { title: 'Bluetooth Low Energy (BLE)', description: 'Short-range tags and beacons for asset identification, proximity and indoor location.' },
      { title: 'Wi-Fi and wireless connectivity', description: 'Local coverage for devices, terminals, controllers and site offices.' },
      { title: 'Zigbee connectivity', description: 'Low-power mesh networks for building, facility and environmental devices.' },
      { title: 'Ethernet and industrial connectivity', description: 'Wired links for controllers, meters and fixed equipment that need deterministic connections.' },
      { title: 'Cellular and satellite-enabled backhaul', description: '4G/LTE and satellite paths that carry data out of remote locations where terrestrial links stop.' },
      { title: 'Multi-network device connectivity', description: 'Devices that can move between available networks without manual intervention.' },
      { title: 'IoT gateway integration', description: 'Gateways configured, secured and integrated with the platform that will consume the data.' },
      { title: 'Remote device communication', description: 'Secure remote access for configuration, diagnostics, updates and troubleshooting.' },
    ],
    technologies: [
      { name: 'LoRaWAN', description: 'Wide-area, low-power sensor coverage for dispersed field assets.', status: 'scoped' },
      { name: 'Bluetooth Low Energy', description: 'Short-range tags and beacons for assets and proximity sensing.', status: 'scoped' },
      { name: 'Wi-Fi', description: 'Local device and terminal connectivity at site level.', status: 'scoped' },
      { name: 'Zigbee', description: 'Low-power mesh for building and facility devices.', status: 'scoped' },
      { name: 'Ethernet and industrial serial', description: 'Wired integration for controllers, meters and fixed equipment.', status: 'scoped' },
      { name: '4G/LTE cellular', description: 'Primary or backup backhaul where mobile coverage is available.', status: 'scoped' },
      { name: 'Satellite backhaul', description: 'Connectivity for sites beyond terrestrial coverage where a suitable satellite service is available.', status: 'scoped' },
      { name: 'MQTT and HTTPS transport', description: 'Standards-based data transport into IoT platforms and business systems.', status: 'scoped' },
    ],
    industries: ['Mining & exploration', 'Agriculture & plantations', 'Utilities & water', 'Logistics & transport', 'Government & remote services', 'Security & facilities'],
    howItWorks: [
      { title: 'Site and signal survey', description: 'We map coverage, obstacles, power availability and the data each site needs to carry.' },
      { title: 'Gateway and network design', description: 'Protocols, gateway placement, backhaul and redundancy are selected for the site, not copied from a template.' },
      { title: 'Install and commission', description: 'Devices and gateways are deployed, tested and documented against agreed acceptance checks.' },
      { title: 'Monitor and support', description: 'Remote visibility and optional managed support keep the link healthy after handover.' },
    ],
    benefits: [
      { title: 'Fewer site visits', description: 'Remote diagnostics reduce the cost and delay of sending technicians to distant locations.' },
      { title: 'Wider operational coverage', description: 'Sensors and equipment can be placed where the work happens, not only where the network reaches.' },
      { title: 'Resilient data flow', description: 'Redundant backhaul options keep critical telemetry moving when one path fails.' },
      { title: 'Faster commissioning', description: 'A single team plans, installs and integrates the connectivity layer end to end.' },
    ],
    related: [
      { name: 'DeepsIoT Cloud', href: '/iot/deepsiot-cloud', description: 'Manage and visualise the data your connected devices produce.' },
      { name: 'DeepsSense', href: '/iot/deepssense', description: 'Choose and deploy the sensors that feed your connectivity network.' },
      { name: 'DeepsManage IoT', href: '/iot/deepsmanage-iot', description: 'Hand over installation, monitoring and maintenance to one accountable team.' },
    ],
    icon: Radio,
    accent: 'emerald',
    heroStats: [
      { value: 'Multi-protocol', label: 'LoRaWAN, BLE, Wi-Fi, Zigbee, Ethernet' },
      { value: 'Remote-first', label: 'Cellular and satellite backhaul options' },
      { value: 'Resilient', label: 'Redundant paths for critical data' },
      { value: 'Managed', label: 'Deployment and support options' },
    ],
    seoTitle: 'DeepsConnect | IoT Connectivity & LoRaWAN Gateways in PNG',
    seoDescription: 'DeepsConnect designs and deploys LoRaWAN gateways, BLE, Wi-Fi, Zigbee and industrial connectivity with cellular and satellite backhaul for remote Papua New Guinea operations.',
  },
  {
    slug: 'deepsfleet',
    number: '02',
    name: 'DeepsFleet',
    category: 'Fleet & Asset Intelligence',
    tagline: 'Know where every vehicle and asset is, and how it is being used.',
    summary: 'GPS tracking, geofencing and utilisation analytics for vehicles, equipment and field assets.',
    intro: [
      'DeepsFleet adds an intelligence layer to the vehicles and equipment your operation depends on. GPS trackers and asset tags feed live location, movement and usage data into dashboards that show where assets are, how they are being driven and where cost is escaping.',
      'It can run alongside DeepsFleet360, our logistics management platform, or as a standalone fleet visibility service for operators who need evidence before they invest in a full transport system.',
    ],
    problems: [
      { title: 'Assets that cannot be found', description: 'Vehicles, trailers and equipment move between sites with no reliable record of their location.' },
      { title: 'Fuel loss and unexplained consumption', description: 'Without per-vehicle data, fuel theft and inefficient routes are difficult to prove or correct.' },
      { title: 'Unsafe driving behaviour', description: 'Speeding, harsh braking and excessive idling go unnoticed until they become incidents or repair bills.' },
      { title: 'Underused equipment', description: 'Plant and machinery are bought or hired without evidence of utilisation across sites.' },
    ],
    capabilities: [
      { title: 'GPS vehicle tracking', description: 'Live location for cars, trucks, plant and powered equipment.' },
      { title: 'Real-time fleet monitoring', description: 'A single view of where every vehicle and asset is right now.' },
      { title: 'Vehicle location and movement history', description: 'Replay trips, stops and routes for investigations and reporting.' },
      { title: 'Geofencing and route monitoring', description: 'Define sites, depots and restricted zones, then alert on entry, exit or deviation.' },
      { title: 'Fuel consumption monitoring', description: 'Track fuel use per vehicle and per trip to expose inefficiency and loss.' },
      { title: 'Fuel theft and anomaly detection', description: 'Flag sudden drops, refuelling outside policy and consumption that does not match the route.' },
      { title: 'Driver behaviour monitoring', description: 'Score speeding, braking, cornering and idling to target coaching and safety.' },
      { title: 'Fleet utilisation reporting', description: 'See which assets are working, idle or overdue for redeployment.' },
      { title: 'Equipment and asset tracking', description: 'Extend visibility beyond vehicles to generators, trailers, pumps and tools.' },
      { title: 'Fleet analytics and operational dashboards', description: 'Turn location and usage data into decisions on cost, safety and capacity.' },
    ],
    technologies: [
      { name: 'GPS and GNSS trackers', description: 'Vehicle and asset trackers with location and movement reporting.', status: 'scoped' },
      { name: 'OBD-II and CAN bus telemetry', description: 'Vehicle data such as fuel, engine hours and diagnostics where the vehicle supports it.', status: 'scoped' },
      { name: 'BLE asset tags', description: 'Lower-cost tagging for trailers, tools and equipment.', status: 'scoped' },
      { name: '4G/LTE cellular', description: 'Primary connectivity for trackers operating in mobile coverage.', status: 'scoped' },
      { name: 'Satellite tracking', description: 'Location reporting for routes and assets beyond cellular coverage.', status: 'planned' },
      { name: 'Geofencing and rules engine', description: 'Automated alerts based on zones, time and movement conditions.', status: 'scoped' },
      { name: 'Reporting and integration APIs', description: 'Fleet data made available to operations, finance and client systems.', status: 'scoped' },
    ],
    industries: ['Logistics & haulage', 'Mining & resources', 'Agriculture & plantations', 'Security services', 'Rental & plant hire', 'Government fleets'],
    howItWorks: [
      { title: 'Fit and register devices', description: 'Trackers are installed on the vehicles and assets that matter most, then registered to your fleet.' },
      { title: 'Define zones and rules', description: 'Depots, sites, routes and alert thresholds are configured around your operating model.' },
      { title: 'Stream and validate data', description: 'Location, fuel and behaviour data are checked for quality before they reach dashboards.' },
      { title: 'Alert, report, improve', description: 'Managers receive exceptions and reports, then act on the patterns behind them.' },
    ],
    benefits: [
      { title: 'Reduce fuel loss', description: 'Consumption anomalies and inefficient trips become visible and actionable.' },
      { title: 'Improve driver safety', description: 'Behaviour data supports coaching, policy enforcement and incident review.' },
      { title: 'Raise asset utilisation', description: 'See idle and underused assets, then redeploy them where they earn their keep.' },
      { title: 'Strengthen client confidence', description: 'Trip and delivery records provide evidence when clients question timelines or location.' },
    ],
    related: [
      { name: 'DeepsFleet360', href: '/deepsfleet360', description: 'The logistics management platform for routing, drivers, maintenance and client records.' },
      { name: 'DeepsIoT Cloud', href: '/iot/deepsiot-cloud', description: 'The device and telemetry platform behind fleet dashboards and alerts.' },
      { name: 'DeepsManage IoT', href: '/iot/deepsmanage-iot', description: 'Managed installation, monitoring and maintenance for your tracking estate.' },
    ],
    icon: Truck,
    accent: 'blue',
    heroStats: [
      { value: 'Live', label: 'Vehicle and asset location' },
      { value: 'Geofenced', label: 'Site and route alerts' },
      { value: 'Fuel-aware', label: 'Consumption and anomaly signals' },
      { value: 'Evidence', label: 'Trip history and utilisation reports' },
    ],
    seoTitle: 'DeepsFleet | GPS Fleet Tracking & Asset Intelligence in PNG',
    seoDescription: 'DeepsFleet delivers GPS vehicle tracking, real-time fleet monitoring, geofencing, fuel anomaly detection, driver behaviour insight and asset utilisation reporting for Papua New Guinea operators.',
  },
  {
    slug: 'deepsindustrial',
    number: '03',
    name: 'DeepsIndustrial',
    category: 'Industrial IoT & Automation',
    tagline: 'See equipment condition before it becomes an unplanned stop.',
    summary: 'Condition monitoring and operational analytics for machines, plant and production equipment.',
    intro: [
      'DeepsIndustrial connects the machines and plant equipment that keep production moving. Vibration, temperature, pressure and performance data are collected from industrial sensors and presented as condition insight rather than raw readings.',
      'The result is a maintenance and operations team that can act on early warning signs, compare equipment across sites and plan interventions before a failure stops the line.',
    ],
    problems: [
      { title: 'Unplanned downtime', description: 'A failed motor, pump or compressor can halt production with no prior warning.' },
      { title: 'Reactive maintenance', description: 'Service happens after failure because there is no condition data to justify earlier intervention.' },
      { title: 'No visibility across sites', description: 'Each plant or site reports differently, so performance cannot be compared or prioritised.' },
      { title: 'Manual inspection rounds', description: 'Technicians record readings by hand, creating delays, gaps and inconsistent records.' },
    ],
    capabilities: [
      { title: 'Industrial equipment monitoring', description: 'Continuous visibility of the machines and plant that carry production risk.' },
      { title: 'Machine condition monitoring', description: 'Health indicators for rotating and critical equipment based on live operating data.' },
      { title: 'Temperature and pressure monitoring', description: 'Trend process and equipment conditions against safe operating ranges.' },
      { title: 'Vibration monitoring', description: 'Detect imbalance, misalignment and bearing wear before they become failures.' },
      { title: 'Equipment performance analytics', description: 'Compare output, runtime and condition across assets and sites.' },
      { title: 'Remote equipment monitoring', description: 'Give engineers visibility of distant plant without travelling to every site.' },
      { title: 'Predictive maintenance capabilities', description: 'Use condition trends to plan maintenance windows around production, not breakdowns.' },
      { title: 'Industrial sensor integration', description: 'Connect vibration, temperature, pressure and other industrial sensors to one data path.' },
      { title: 'Operational alerts', description: 'Notify the right team when a reading crosses a threshold or a trend turns adverse.' },
      { title: 'Industrial data integration', description: 'Feed condition and performance data into maintenance, ERP and reporting systems.' },
    ],
    technologies: [
      { name: 'Vibration sensors', description: 'Continuous monitoring for rotating equipment such as motors, pumps and fans.', status: 'scoped' },
      { name: 'Temperature and pressure transmitters', description: 'Process and equipment condition measurement.', status: 'scoped' },
      { name: 'Modbus and industrial protocols', description: 'Integration with meters, controllers and industrial devices.', status: 'scoped' },
      { name: 'PLC and SCADA integration', description: 'Read existing control-system data where access and architecture allow.', status: 'scoped' },
      { name: 'Edge gateways', description: 'Local collection and buffering so data survives intermittent connectivity.', status: 'scoped' },
      { name: 'Ethernet and cellular backhaul', description: 'Site connectivity matched to the plant environment.', status: 'scoped' },
      { name: 'Historian and analytics integration', description: 'Condition data made available for trending, reporting and analysis.', status: 'scoped' },
      { name: 'Predictive models', description: 'Asset-specific failure models developed from operating history.', status: 'planned' },
    ],
    industries: ['Manufacturing', 'Mining & processing', 'Energy & power', 'Water treatment', 'Food processing', 'Logistics depots'],
    howItWorks: [
      { title: 'Asset criticality review', description: 'We identify the equipment where failure cost and likelihood justify monitoring.' },
      { title: 'Instrument and connect', description: 'Sensors, gateways and integrations are installed around the selected assets.' },
      { title: 'Baseline and alert', description: 'Normal operating behaviour is established, then thresholds and alerts are configured.' },
      { title: 'Analyse and predict', description: 'Trends are reviewed with your maintenance team to plan work before failure.' },
    ],
    benefits: [
      { title: 'Less unplanned downtime', description: 'Early condition signals create time to plan repairs and avoid production stops.' },
      { title: 'Lower maintenance cost', description: 'Intervene when condition justifies it rather than on a fixed calendar.' },
      { title: 'Longer asset life', description: 'Address imbalance, overheating and wear before they cause secondary damage.' },
      { title: 'Consistent operational records', description: 'Condition and performance history is captured automatically for audits and planning.' },
    ],
    related: [
      { name: 'DeepsFlow', href: '/deepsflow', description: 'Cloud and workflow automation to act on industrial events across teams.' },
      { name: 'DeepsIoT Cloud', href: '/iot/deepsiot-cloud', description: 'Device management, telemetry and dashboards for industrial data.' },
      { name: 'DeepsManage IoT', href: '/iot/deepsmanage-iot', description: 'Ongoing monitoring, maintenance and support for industrial IoT.' },
    ],
    icon: Factory,
    accent: 'amber',
    heroStats: [
      { value: 'Condition', label: 'Vibration, temperature and pressure' },
      { value: 'Continuous', label: 'Monitoring instead of manual rounds' },
      { value: 'Prioritised', label: 'Alerts focused on critical assets' },
      { value: 'Planned', label: 'Maintenance windows, not breakdowns' },
    ],
    seoTitle: 'DeepsIndustrial | Industrial IoT & Condition Monitoring in PNG',
    seoDescription: 'DeepsIndustrial connects industrial equipment for condition monitoring, vibration and temperature insight, predictive maintenance planning and operational analytics across Papua New Guinea sites.',
  },
  {
    slug: 'deepsutilities',
    number: '04',
    name: 'DeepsUtilities',
    category: 'Smart Utilities & Infrastructure',
    tagline: 'Visibility and control across water, power and public infrastructure.',
    summary: 'Smart metering, leak detection and pump automation for utilities and facility operators.',
    intro: [
      'DeepsUtilities brings measurement and remote control to the water, power and infrastructure assets that communities and facilities rely on. Tank levels, flow, pressure, pump status and electricity use are monitored continuously and presented to the teams responsible for service delivery.',
      'The service is designed for distributed networks where manual inspection is slow and losses are hard to see, from municipal water systems to mine camps, plantations and island communities.',
    ],
    problems: [
      { title: 'Undetected water leaks', description: 'Losses continue underground or after hours until a bill, overflow or complaint reveals them.' },
      { title: 'Manual tank and pump checks', description: 'Staff travel long distances to confirm levels and switch pumps that could report remotely.' },
      { title: 'Pump failures and dry running', description: 'Pumps operate without protection or condition visibility, shortening equipment life.' },
      { title: 'Unclear consumption and cost', description: 'Electricity and water use cannot be allocated to sites, departments or tenants without reliable metering.' },
    ],
    capabilities: [
      { title: 'Smart water monitoring', description: 'Continuous visibility of water levels, flow and pressure across the network.' },
      { title: 'Water tank level monitoring', description: 'Know how much water is available at each tank without sending someone to look.' },
      { title: 'Water flow and consumption monitoring', description: 'Measure demand by site, zone or tenant to find waste and allocate cost.' },
      { title: 'Leak detection', description: 'Identify abnormal night flow, pressure loss and unexplained consumption patterns.' },
      { title: 'Pump monitoring and automation', description: 'Track pump status, runtime and faults, and automate start/stop rules where appropriate.' },
      { title: 'Electricity consumption monitoring', description: 'Meter and compare power use across buildings, plants and remote sites.' },
      { title: 'Power system monitoring', description: 'Watch supply quality and critical power conditions that affect operations.' },
      { title: 'Generator monitoring', description: 'Track generator runtime, fuel and start events to control cost and readiness.' },
      { title: 'Infrastructure monitoring', description: 'Bring dispersed assets such as reservoirs, boreholes and substations into one view.' },
      { title: 'Remote utility management', description: 'Operate and investigate from a central location instead of travelling site to site.' },
    ],
    technologies: [
      { name: 'Level and pressure sensors', description: 'Tank, reservoir and pipeline measurement.', status: 'scoped' },
      { name: 'Flow meters', description: 'Consumption and leak-detection data by zone or connection.', status: 'scoped' },
      { name: 'Smart electricity meters', description: 'Site and tenant-level power consumption measurement.', status: 'scoped' },
      { name: 'Pump and generator controllers', description: 'Status, runtime and control integration for pumps and generators.', status: 'scoped' },
      { name: 'LoRaWAN and cellular backhaul', description: 'Connectivity for dispersed field assets across a service area.', status: 'scoped' },
      { name: 'Satellite backhaul', description: 'Connectivity for remote or island infrastructure beyond terrestrial coverage.', status: 'planned' },
      { name: 'Utility dashboards and alerts', description: 'Operational views and exception alerts for utility teams.', status: 'scoped' },
    ],
    industries: ['Water utilities', 'Municipalities', 'Mining camps', 'Plantations', 'Commercial buildings', 'Island communities'],
    howItWorks: [
      { title: 'Map the network', description: 'We inventory tanks, pumps, meters and supply points, then agree the measurements that matter.' },
      { title: 'Instrument key points', description: 'Sensors, meters and controllers are installed at the points with the greatest operational value.' },
      { title: 'Automate responses', description: 'Alerts and pump rules are configured to reduce manual checks and prevent avoidable failures.' },
      { title: 'Report and maintain', description: 'Consumption, losses and uptime are reported, with maintenance planned from the data.' },
    ],
    benefits: [
      { title: 'Reduce water losses', description: 'Leak and night-flow patterns surface before they become major losses.' },
      { title: 'Fewer manual site visits', description: 'Remote levels and status reduce routine travel and after-hours callouts.' },
      { title: 'Control energy cost', description: 'Consumption data reveals waste and supports fair cost allocation.' },
      { title: 'Protect critical equipment', description: 'Pump and generator visibility supports preventive maintenance and longer service life.' },
    ],
    related: [
      { name: 'DeepsSense', href: '/iot/deepssense', description: 'Environmental and water quality sensors that extend utility monitoring.' },
      { name: 'DeepsConnect', href: '/iot/deepsconnect', description: 'The gateways and backhaul that reach dispersed utility assets.' },
      { name: 'DeepsManage IoT', href: '/iot/deepsmanage-iot', description: 'Managed monitoring and maintenance for utility IoT networks.' },
    ],
    icon: Droplets,
    accent: 'cyan',
    heroStats: [
      { value: 'Water', label: 'Levels, flow, pressure and leaks' },
      { value: 'Power', label: 'Consumption and generator visibility' },
      { value: 'Automated', label: 'Pump and alert rules' },
      { value: 'Remote', label: 'Management of dispersed assets' },
    ],
    seoTitle: 'DeepsUtilities | Smart Water & Utility Monitoring in PNG',
    seoDescription: 'DeepsUtilities delivers smart water monitoring, tank level and leak detection, pump automation, electricity and generator monitoring, and remote utility management for PNG infrastructure.',
  },
  {
    slug: 'deepsagri',
    number: '05',
    name: 'DeepsAgri',
    category: 'Agricultural IoT & Smart Farming',
    tagline: 'Field-level data for better water, yield and input decisions.',
    summary: 'Soil, weather and irrigation monitoring that connects plantations and farms to actionable insight.',
    intro: [
      'DeepsAgri puts measurement into the field. Soil moisture, weather, temperature and humidity sensors show what is happening across blocks, zones and seasons, so irrigation and inputs can be scheduled from evidence rather than assumption.',
      'It is built for plantations, cooperatives and commercial farms that manage large areas with limited field visibility, and it can connect to AgriTrace where produce traceability and export records are required.',
    ],
    problems: [
      { title: 'Irrigation by guesswork', description: 'Water is applied on a fixed schedule that ignores rainfall, soil condition and crop demand.' },
      { title: 'Labour-intensive field scouting', description: 'Staff spend hours walking blocks to find stress, disease or equipment problems.' },
      { title: 'Micro-climate variation', description: 'Conditions differ across an estate, but decisions are made from a single weather report.' },
      { title: 'Limited livestock oversight', description: 'Animals and water points are difficult to monitor across large or remote grazing areas.' },
    ],
    capabilities: [
      { title: 'Soil moisture monitoring', description: 'Understand water availability at root level across blocks and soil types.' },
      { title: 'Weather station integration', description: 'Local rainfall, wind, temperature and humidity data for better scheduling.' },
      { title: 'Temperature and humidity monitoring', description: 'Track crop and storage conditions that affect quality and disease pressure.' },
      { title: 'Smart irrigation', description: 'Trigger or recommend irrigation from soil and weather data rather than a fixed calendar.' },
      { title: 'Water management', description: 'Measure water use and losses across pumps, tanks and irrigation lines.' },
      { title: 'Plantation monitoring', description: 'Bring block-level conditions into one view for estate managers.' },
      { title: 'Livestock monitoring', description: 'Track animal location, movement and water-point activity where tags are deployed.' },
      { title: 'Environmental monitoring', description: 'Watch the conditions that influence yield, quality and worker safety.' },
      { title: 'Agricultural analytics', description: 'Compare seasons, blocks and interventions to refine agronomic decisions.' },
      { title: 'Remote farm monitoring', description: 'Give managers visibility of distant estates without constant travel.' },
    ],
    technologies: [
      { name: 'Soil moisture probes', description: 'Root-zone moisture measurement at representative points.', status: 'scoped' },
      { name: 'Weather stations', description: 'Local rainfall, wind, temperature and humidity data.', status: 'scoped' },
      { name: 'Temperature and humidity sensors', description: 'Crop, greenhouse and storage condition monitoring.', status: 'scoped' },
      { name: 'Irrigation controllers', description: 'Valve and pump control for data-driven irrigation.', status: 'scoped' },
      { name: 'Livestock tags', description: 'Location and movement tracking for herds and grazing areas.', status: 'scoped' },
      { name: 'LoRaWAN and cellular backhaul', description: 'Field connectivity for dispersed sensors.', status: 'scoped' },
      { name: 'Satellite backhaul', description: 'Connectivity for estates beyond terrestrial coverage where a suitable satellite service is available.', status: 'scoped' },
      { name: 'Agronomy dashboards', description: 'Block, season and sensor views for farm managers.', status: 'scoped' },
    ],
    industries: ['Oil palm & plantations', 'Smallholder cooperatives', 'Livestock', 'Horticulture', 'Agro-processing', 'Agricultural finance'],
    howItWorks: [
      { title: 'Zone the estate', description: 'We divide the property into blocks or management zones that reflect soil, crop and water differences.' },
      { title: 'Deploy sensors', description: 'Soil, weather and water sensors are placed at representative points and connected.' },
      { title: 'Irrigate on data', description: 'Scheduling rules and alerts are set from soil and weather thresholds.' },
      { title: 'Review and refine', description: 'Seasonal results are reviewed with your agronomy team to improve the next cycle.' },
    ],
    benefits: [
      { title: 'Water efficiency', description: 'Irrigation is applied when the crop needs it, reducing waste and energy cost.' },
      { title: 'Better yield decisions', description: 'Block-level conditions reveal where intervention will have the greatest effect.' },
      { title: 'Earlier stress detection', description: 'Soil and climate trends show stress before it is visible in the field.' },
      { title: 'Lower input waste', description: 'Target water, energy and field labour using measured conditions.' },
    ],
    related: [
      { name: 'AgriTrace', href: '/agritrace', description: 'Traceability-as-a-Service for export-ready produce records.' },
      { name: 'DeepsSense', href: '/iot/deepssense', description: 'The sensor and telemetry layer behind agricultural monitoring.' },
      { name: 'DeepsConnect', href: '/iot/deepsconnect', description: 'Connectivity for sensors spread across large estates.' },
    ],
    icon: Sprout,
    accent: 'teal',
    heroStats: [
      { value: 'Soil', label: 'Moisture at root level' },
      { value: 'Weather', label: 'Local station data' },
      { value: 'Irrigation', label: 'Data-driven scheduling' },
      { value: 'Estate-wide', label: 'Remote block visibility' },
    ],
    seoTitle: 'DeepsAgri | Agricultural IoT & Smart Farming in PNG',
    seoDescription: 'DeepsAgri provides soil moisture and weather monitoring, smart irrigation, plantation and livestock visibility, and agricultural analytics for farms and estates across Papua New Guinea.',
  },
  {
    slug: 'deepssense',
    number: '06',
    name: 'DeepsSense',
    category: 'Sensors, Telemetry & Environmental Monitoring',
    tagline: 'The right measurement, in the right place, at the right time.',
    summary: 'Sensor selection, telemetry and environmental monitoring for facilities, field sites and industry.',
    intro: [
      'DeepsSense takes the guesswork out of sensor deployment. We help you decide what to measure, select devices suited to the environment, and build the telemetry path that turns readings into usable operational information.',
      'The service covers environmental, air and water quality, soil, temperature, humidity, motion and proximity sensing, with alerts and dashboards configured around the thresholds that matter to your operation.',
    ],
    problems: [
      { title: 'No reliable environmental data', description: 'Conditions are estimated from a distant weather report or a single handheld reading.' },
      { title: 'Sensor sprawl', description: 'Different teams buy different devices that cannot be compared or managed together.' },
      { title: 'Manual readings and logbooks', description: 'Staff record measurements by hand, creating delays, transcription errors and gaps.' },
      { title: 'Late detection of excursions', description: 'Temperature, humidity or air-quality problems are discovered after damage or complaint.' },
    ],
    capabilities: [
      { title: 'Environmental sensors', description: 'Purpose-selected sensors for the conditions your operation needs to watch.' },
      { title: 'Temperature sensors', description: 'Monitor equipment, rooms, cold chain and process conditions.' },
      { title: 'Humidity sensors', description: 'Track moisture levels that affect comfort, storage and product quality.' },
      { title: 'Air quality monitoring', description: 'Measure particulates and gases where worker health or compliance is at stake.' },
      { title: 'Water quality monitoring', description: 'Watch key water parameters across supply, treatment and environmental points.' },
      { title: 'Soil sensors', description: 'Measure soil moisture and related conditions for agricultural and environmental use.' },
      { title: 'Motion and proximity sensors', description: 'Detect movement, access and presence for security and utilisation insight.' },
      { title: 'Remote telemetry', description: 'Send readings from dispersed sites without manual collection.' },
      { title: 'Real-time sensor data collection', description: 'Continuous data capture instead of periodic spot checks.' },
      { title: 'Automated monitoring alerts', description: 'Notify the responsible team when a reading or trend crosses a threshold.' },
    ],
    technologies: [
      { name: 'Temperature and humidity sensors', description: 'Environmental and cold-chain measurement.', status: 'scoped' },
      { name: 'Air quality sensors', description: 'Particulate and gas monitoring for health and compliance.', status: 'scoped' },
      { name: 'Water quality sensors', description: 'Supply, treatment and environmental water parameters.', status: 'scoped' },
      { name: 'Soil sensors', description: 'Moisture and related soil condition measurement.', status: 'scoped' },
      { name: 'Motion and proximity sensors', description: 'Presence, access and movement detection.', status: 'scoped' },
      { name: 'LoRaWAN, BLE and Wi-Fi', description: 'Sensor connectivity matched to range, power and density.', status: 'scoped' },
      { name: 'Cellular and satellite backhaul', description: 'Telemetry transport for remote and dispersed sites.', status: 'scoped' },
      { name: 'Telemetry API', description: 'Sensor data made available to dashboards and business systems.', status: 'scoped' },
    ],
    industries: ['Cold chain & food', 'Healthcare & laboratories', 'Water & environment', 'Mining camps', 'Buildings & facilities', 'Agriculture'],
    howItWorks: [
      { title: 'Define what to measure', description: 'We start from the decision you need to make, not from a catalogue of sensors.' },
      { title: 'Select and place sensors', description: 'Devices are chosen for the environment and positioned for representative readings.' },
      { title: 'Transmit and validate', description: 'Telemetry is connected, checked for quality and calibrated where required.' },
      { title: 'Alert and analyse', description: 'Thresholds, dashboards and reports turn readings into action.' },
    ],
    benefits: [
      { title: 'Earlier warnings', description: 'Excursions and adverse trends are detected while there is still time to respond.' },
      { title: 'Defensible records', description: 'Continuous measurement provides evidence for compliance, audits and disputes.' },
      { title: 'Less manual logging', description: 'Staff are freed from routine reading rounds and transcription.' },
      { title: 'Scalable deployments', description: 'A consistent sensor and telemetry approach makes it easier to add sites over time.' },
    ],
    related: [
      { name: 'DeepsConnect', href: '/iot/deepsconnect', description: 'Gateways and backhaul that carry sensor data from the field.' },
      { name: 'DeepsIoT Cloud', href: '/iot/deepsiot-cloud', description: 'Platform services for telemetry, dashboards and alerts.' },
      { name: 'DeepsAgri', href: '/iot/deepsagri', description: 'Agricultural monitoring built on soil and weather sensing.' },
    ],
    icon: Thermometer,
    accent: 'sky',
    heroStats: [
      { value: 'Environmental', label: 'Air, water and climate' },
      { value: 'Continuous', label: 'Telemetry instead of spot checks' },
      { value: 'Alerted', label: 'Threshold and trend notifications' },
      { value: 'Evidence', label: 'Historical records for audit' },
    ],
    seoTitle: 'DeepsSense | Sensors, Telemetry & Environmental Monitoring PNG',
    seoDescription: 'DeepsSense delivers environmental, air, water, soil, temperature, humidity, motion and proximity sensing with remote telemetry and automated alerts for PNG operations.',
  },
  {
    slug: 'deepsiot-cloud',
    number: '07',
    name: 'DeepsIoT Cloud',
    category: 'IoT Platform & Device Management',
    tagline: 'One place to register, watch and manage every connected device.',
    summary: 'Device lifecycle, telemetry, dashboards and APIs in a central IoT platform.',
    intro: [
      'DeepsIoT Cloud is the layer that makes connected devices manageable. It provides a central register of devices, a consistent path for telemetry, dashboards for operational teams and APIs for the systems that need the data.',
      'Rather than replacing your existing business applications, it connects them. Device events, historical readings and alerts are made available where decisions are already made, with access and scope agreed during solution design.',
    ],
    problems: [
      { title: 'Device inventory in spreadsheets', description: 'No one can say with confidence which devices are deployed, where they are or who owns them.' },
      { title: 'Inconsistent telemetry', description: 'Each vendor or site sends data differently, making comparison and reporting difficult.' },
      { title: 'Too many dashboards', description: 'Operations teams must log into several portals to understand one asset or site.' },
      { title: 'Integration gaps', description: 'IoT data stays isolated from maintenance, finance, ERP and client systems.' },
    ],
    capabilities: [
      { title: 'Centralised IoT device management', description: 'One register for devices, sites, owners and status.' },
      { title: 'Device registration and provisioning', description: 'Structured onboarding so new devices are known and configured consistently.' },
      { title: 'Device lifecycle management', description: 'Track devices from installation through service, replacement and retirement.' },
      { title: 'Real-time telemetry processing', description: 'Ingest and normalise readings as they arrive from the field.' },
      { title: 'IoT dashboards', description: 'Operational views tailored to the teams responsible for the assets.' },
      { title: 'Data visualisation', description: 'Trends, comparisons and maps that make device data readable.' },
      { title: 'API integration', description: 'Expose device and telemetry data to business systems and partner platforms.' },
      { title: 'Data storage and historical reporting', description: 'Keep a usable history for analysis, audit and performance review.' },
      { title: 'Event processing', description: 'Turn raw readings into meaningful events and exceptions.' },
      { title: 'Workflow automation', description: 'Trigger tasks, notifications and escalations when conditions change.' },
      { title: 'Third-party platform integration', description: 'Connect selected external platforms rather than forcing a single vendor ecosystem.' },
    ],
    technologies: [
      { name: 'Device registry', description: 'Central record of device identity, site and lifecycle state.', status: 'scoped' },
      { name: 'MQTT and HTTPS ingestion', description: 'Common transport options for device telemetry.', status: 'scoped' },
      { name: 'Time-series data storage', description: 'Historical readings retained for trending and reporting.', status: 'scoped' },
      { name: 'Operational dashboards', description: 'Role-focused views for operations and management.', status: 'scoped' },
      { name: 'REST APIs and webhooks', description: 'Integration with business applications and event consumers.', status: 'scoped' },
      { name: 'Rules and event engine', description: 'Threshold, trend and workflow logic applied to incoming data.', status: 'scoped' },
      { name: 'Role-based access control', description: 'Access scoped by team, site and responsibility.', status: 'scoped' },
      { name: 'Third-party connectors', description: 'Integration with selected external platforms and data services.', status: 'planned' },
    ],
    industries: ['Multi-site operators', 'Utilities', 'Agriculture', 'Industry', 'Logistics', 'Government'],
    howItWorks: [
      { title: 'Model your assets', description: 'Sites, devices and data points are defined around how your business is organised.' },
      { title: 'Connect and provision', description: 'Devices are onboarded and their telemetry is validated into a common format.' },
      { title: 'Build views and rules', description: 'Dashboards, alerts and workflows are configured for the teams who will use them.' },
      { title: 'Integrate and scale', description: 'APIs connect the platform to business systems as additional sites come online.' },
    ],
    benefits: [
      { title: 'Single source of truth', description: 'One device register and one telemetry model reduce ambiguity across teams.' },
      { title: 'Faster onboarding', description: 'Repeatable provisioning shortens the path from installation to useful data.' },
      { title: 'Better operational decisions', description: 'Consistent dashboards and history make performance comparable over time.' },
      { title: 'Integration-ready', description: 'APIs and events let IoT data support existing business processes.' },
    ],
    related: [
      { name: 'DeepsFlow', href: '/deepsflow', description: 'Cloud and automation services that extend IoT workflows into business operations.' },
      { name: 'DeepsSecure IoT', href: '/iot/deepssecure-iot', description: 'Identity and protection for the devices connected to the platform.' },
      { name: 'DeepsManage IoT', href: '/iot/deepsmanage-iot', description: 'Managed operation of the platform and the devices behind it.' },
    ],
    icon: CloudCog,
    accent: 'violet',
    heroStats: [
      { value: 'Registered', label: 'Devices, sites and owners' },
      { value: 'Unified', label: 'Telemetry and history' },
      { value: 'Visualised', label: 'Dashboards for operations' },
      { value: 'Integrated', label: 'APIs and events' },
    ],
    seoTitle: 'DeepsIoT Cloud | IoT Device Management Platform in PNG',
    seoDescription: 'DeepsIoT Cloud centralises IoT device management, provisioning, telemetry processing, dashboards, historical reporting, APIs and workflow automation for PNG organisations.',
  },
  {
    slug: 'deepssecure-iot',
    number: '08',
    name: 'DeepsSecure IoT',
    category: 'IoT Cybersecurity & Device Protection',
    tagline: 'Connected devices should not become the weakest link.',
    summary: 'Identity, encryption and monitoring that protect IoT devices and the networks around them.',
    intro: [
      'DeepsSecure IoT protects the devices, gateways and networks that make up a connected operation. It starts with knowing what is connected, then applies identity, access control, encryption and monitoring so that convenience does not come at the cost of security.',
      'The service is designed to work with the security and compliance functions you already have, and can draw on DeepsGuard360 and DeepsComply360 where broader security operations or governance programmes are in place.',
    ],
    problems: [
      { title: 'Default and shared credentials', description: 'Devices shipped with default passwords or shared logins become an easy entry point.' },
      { title: 'Unpatched devices', description: 'Firmware and software age quietly, leaving known vulnerabilities exposed.' },
      { title: 'Flat networks', description: 'IoT devices share a network with business systems, so one compromised sensor can reach much more.' },
      { title: 'No device inventory', description: 'Unknown or forgotten devices cannot be protected, patched or decommissioned.' },
    ],
    capabilities: [
      { title: 'IoT device authentication', description: 'Verify that a device is genuine before it is trusted on the network.' },
      { title: 'Device identity management', description: 'Give each device a unique, manageable identity through its lifecycle.' },
      { title: 'Secure device communication', description: 'Protect data in transit between devices, gateways and platforms.' },
      { title: 'Encryption', description: 'Apply encryption appropriate to the device, network and data sensitivity.' },
      { title: 'Access control', description: 'Limit who and what can reach devices, dashboards and administrative functions.' },
      { title: 'Network segmentation', description: 'Separate IoT traffic from business and corporate systems to contain risk.' },
      { title: 'Security monitoring', description: 'Watch for unusual device behaviour, access and connectivity patterns.' },
      { title: 'Device vulnerability management', description: 'Identify and prioritise device weaknesses for remediation.' },
      { title: 'Security event logging', description: 'Retain the evidence needed for investigation, audit and compliance.' },
      { title: 'IoT network protection', description: 'Apply controls at the gateway and network layer, not only at the endpoint.' },
    ],
    technologies: [
      { name: 'Certificate-based device identity', description: 'Strong device authentication and lifecycle-managed credentials.', status: 'scoped' },
      { name: 'TLS and secure transport', description: 'Encrypted communication between devices, gateways and platforms.', status: 'scoped' },
      { name: 'Network segmentation', description: 'Separation of IoT, operational and business network traffic.', status: 'scoped' },
      { name: 'Role-based access control', description: 'Scoped access to devices, data and administrative functions.', status: 'scoped' },
      { name: 'Log and SIEM integration', description: 'Security events forwarded to monitoring and investigation tools.', status: 'scoped' },
      { name: 'Vulnerability assessment', description: 'Identification and prioritisation of device and network weaknesses.', status: 'scoped' },
      { name: 'Device posture monitoring', description: 'Ongoing checks on device state and policy compliance.', status: 'planned' },
      { name: 'Managed security operations', description: 'Escalation and response through DeepsGuard360 where engaged.', status: 'scoped' },
    ],
    industries: ['Critical infrastructure', 'Utilities', 'Healthcare', 'Financial services', 'Government', 'Industrial operators'],
    howItWorks: [
      { title: 'Discover and classify', description: 'We establish what is connected, where it sits and how sensitive its data is.' },
      { title: 'Harden and segment', description: 'Credentials, access, encryption and network boundaries are brought under control.' },
      { title: 'Monitor and alert', description: 'Device and network activity is watched for behaviour that needs investigation.' },
      { title: 'Patch and review', description: 'Vulnerabilities and incidents feed a repeatable remediation and review cycle.' },
    ],
    benefits: [
      { title: 'Reduced breach risk', description: 'Identity, segmentation and encryption close common IoT entry paths.' },
      { title: 'Clear device inventory', description: 'You can see what is connected and decide what should be.' },
      { title: 'Compliance evidence', description: 'Logging and access records support audit and regulatory obligations.' },
      { title: 'Faster incident response', description: 'Device-level visibility shortens investigation and containment.' },
    ],
    related: [
      { name: 'DeepsGuard360', href: '/deepsguard360', description: 'Integrated security operations for guards, patrols, incidents and clients.' },
      { name: 'DeepsComply360', href: '/deepscomply360', description: 'Data protection and regulatory compliance frameworks.' },
      { name: 'DeepsIoT Cloud', href: '/iot/deepsiot-cloud', description: 'Device lifecycle and telemetry management with access control.' },
    ],
    icon: ShieldCheck,
    accent: 'rose',
    heroStats: [
      { value: 'Identity', label: 'Every device accounted for' },
      { value: 'Encrypted', label: 'Protected device communication' },
      { value: 'Segmented', label: 'IoT separated from business systems' },
      { value: 'Monitored', label: 'Events logged and investigated' },
    ],
    seoTitle: 'DeepsSecure IoT | IoT Cybersecurity & Device Protection PNG',
    seoDescription: 'DeepsSecure IoT provides device authentication, identity management, encryption, access control, network segmentation, vulnerability management and security monitoring for IoT deployments in PNG.',
  },
  {
    slug: 'deepsmanage-iot',
    number: '09',
    name: 'DeepsManage IoT',
    category: 'Managed IoT Services',
    tagline: 'Design, deploy and run your IoT estate with one accountable partner.',
    summary: 'End-to-end managed services from architecture and installation to support and upgrades.',
    intro: [
      'DeepsManage IoT is for organisations that want the outcome of connected operations without building a dedicated IoT team. We take responsibility for the full lifecycle: consultation, architecture, installation, configuration, monitoring, maintenance and upgrades.',
      'It is delivered as a managed service with clear scope, service expectations and reporting, so your team knows what is being monitored, what happens when something fails and how the estate will evolve.',
    ],
    problems: [
      { title: 'No in-house IoT skills', description: 'The organisation sees the value of connected assets but lacks the specialists to deliver and run it.' },
      { title: 'Pilots that stall', description: 'A successful trial is never scaled because ownership and operating responsibility are unclear.' },
      { title: 'Complex procurement', description: 'Devices, gateways, connectivity, platform and support are bought separately and do not fit together.' },
      { title: 'Maintenance burden', description: 'Devices need replacement, configuration and firmware care long after the project ends.' },
    ],
    capabilities: [
      { title: 'IoT consultation', description: 'Start with the operational problem and agree where connected technology can realistically help.' },
      { title: 'System architecture and planning', description: 'Design devices, connectivity, platform and integration as one solution.' },
      { title: 'Device installation', description: 'Professional installation coordinated around site access and safety requirements.' },
      { title: 'Gateway configuration', description: 'Gateways configured for the protocols, backhaul and platform in use.' },
      { title: 'Sensor deployment', description: 'Sensors placed, mounted and commissioned for reliable readings.' },
      { title: 'Network configuration', description: 'Connectivity, addressing, security and redundancy set up for the site.' },
      { title: 'Remote device monitoring', description: 'Ongoing visibility of device health and data flow from a central team.' },
      { title: 'Preventive maintenance', description: 'Scheduled checks, calibration and replacement before failures affect operations.' },
      { title: 'Technical support', description: 'A defined support path for faults, changes and operational questions.' },
      { title: 'Device lifecycle management', description: 'Provisioning, replacement and retirement managed across the estate.' },
      { title: 'System upgrades and integration', description: 'Platform and device improvements planned as your operation and technology change.' },
    ],
    technologies: [
      { name: 'Site survey and solution design', description: 'Structured assessment and architecture before commitment.', status: 'scoped' },
      { name: 'Device installation and commissioning', description: 'Installation, testing and handover against agreed checks.', status: 'scoped' },
      { name: 'Gateway and network configuration', description: 'Connectivity, protocol and security configuration.', status: 'scoped' },
      { name: 'Remote monitoring and support', description: 'Central monitoring with a defined support path.', status: 'scoped' },
      { name: 'Preventive maintenance', description: 'Scheduled service, calibration and replacement planning.', status: 'scoped' },
      { name: 'Spares and lifecycle planning', description: 'Practical planning for device ageing and replacement.', status: 'scoped' },
      { name: 'Integration and upgrade projects', description: 'Changes delivered as operational needs evolve.', status: 'scoped' },
      { name: 'Satellite connectivity integration', description: 'Satellite connectivity integrated where it suits the site and operating model.', status: 'scoped' },
    ],
    industries: ['Mining & resources', 'Utilities', 'Agriculture & plantations', 'Logistics', 'Government', 'Commercial property'],
    howItWorks: [
      { title: 'Assess', description: 'We review sites, assets, connectivity and operating constraints with your team.' },
      { title: 'Design', description: 'A solution and service scope are agreed, including what success will look like.' },
      { title: 'Deploy', description: 'Devices, gateways and platform are installed, configured and accepted.' },
      { title: 'Operate', description: 'Monitoring, maintenance, support and upgrades continue under a managed service.' },
    ],
    benefits: [
      { title: 'Faster time to value', description: 'One team owns the path from concept to operating service.' },
      { title: 'Predictable support', description: 'A clear support path replaces ad hoc vendor escalation.' },
      { title: 'Lower lifecycle cost', description: 'Preventive maintenance and planned replacement avoid emergency spending.' },
      { title: 'One accountable partner', description: 'Devices, connectivity, platform and support are coordinated rather than fragmented.' },
    ],
    related: [
      { name: 'DeepsCare360', href: '/deepscare360', description: 'Managed IT support for the broader technology environment.' },
      { name: 'DeepsAdvisory360', href: '/deepsadvisory360', description: 'Strategic technology planning and roadmap development.' },
      { name: 'DeepsConnect', href: '/iot/deepsconnect', description: 'The connectivity foundation for managed IoT deployments.' },
    ],
    icon: Wrench,
    accent: 'indigo',
    heroStats: [
      { value: 'End-to-end', label: 'Consult, design, deploy, operate' },
      { value: 'Managed', label: 'Monitoring and support included' },
      { value: 'Lifecycle', label: 'Maintenance and replacement planning' },
      { value: 'Accountable', label: 'One service partner' },
    ],
    seoTitle: 'DeepsManage IoT | Managed IoT Services in PNG',
    seoDescription: 'DeepsManage IoT provides managed IoT services including consultation, architecture, installation, gateway and sensor deployment, remote monitoring, maintenance, support and upgrades across PNG.',
  },
];

export const getIotService = (slug?: string): IotService | undefined =>
  iotServices.find((service) => service.slug === slug);

export interface IotNavItem {
  name: string;
  href: string;
  desc: string;
  icon: LucideIcon;
}

export const iotNavItems: IotNavItem[] = iotServices.map((service) => ({
  name: service.name,
  href: `/iot/${service.slug}`,
  desc: service.category,
  icon: service.icon,
}));

export interface IotLayer {
  number: string;
  name: string;
  description: string;
  items: string[];
  icon: LucideIcon;
}

export const iotLayers: IotLayer[] = [
  {
    number: '01',
    name: 'Physical devices',
    description: 'The assets and measurements that generate operational data.',
    items: ['GPS trackers', 'IoT sensors', 'Smart meters', 'Industrial devices', 'Environmental sensors', 'Monitoring equipment'],
    icon: Boxes,
  },
  {
    number: '02',
    name: 'Connectivity',
    description: 'The local and wide-area links that carry device data.',
    items: ['LoRaWAN', 'Bluetooth Low Energy', 'Wi-Fi', 'Zigbee', 'Ethernet', 'Cellular', 'Satellite'],
    icon: Wifi,
  },
  {
    number: '03',
    name: 'Gateway and network integration',
    description: 'The point where field protocols are translated and secured.',
    items: ['IoT gateways', 'Gateway integration', 'Protocol translation', 'Device communication', 'Network management'],
    icon: Network,
  },
  {
    number: '04',
    name: 'IoT platform',
    description: 'The services that make device data manageable and useful.',
    items: ['Device management', 'Telemetry processing', 'APIs', 'Data storage', 'Analytics', 'Automation'],
    icon: CloudCog,
  },
  {
    number: '05',
    name: 'Business applications',
    description: 'The operational outcomes that justify the ecosystem.',
    items: ['Fleet intelligence', 'Smart utilities', 'Industrial monitoring', 'Agricultural monitoring', 'Asset management', 'Environmental monitoring'],
    icon: Gauge,
  },
];

export const iotIndustries = [
  { name: 'Mining & resources', description: 'Remote assets, equipment condition and site infrastructure.', icon: Factory },
  { name: 'Agriculture & plantations', description: 'Soil, water, weather and estate-level visibility.', icon: Sprout },
  { name: 'Utilities & infrastructure', description: 'Water, power, pumps and dispersed public assets.', icon: Droplets },
  { name: 'Logistics & transport', description: 'Vehicle, fuel and asset intelligence across routes.', icon: Truck },
  { name: 'Government & remote services', description: 'Connectivity and monitoring where networks are thin.', icon: Building2 },
  { name: 'Commercial & industrial facilities', description: 'Energy, environment, security and equipment uptime.', icon: Layers },
];

export const iotApplications = [
  { title: 'Remote asset visibility', description: 'Know where equipment, vehicles and infrastructure are and how they are performing.', icon: MapPinned },
  { title: 'Water and energy efficiency', description: 'Find losses, measure consumption and target the interventions that save the most.', icon: Waves },
  { title: 'Equipment uptime', description: 'Move from reactive repairs to condition-informed maintenance planning.', icon: Activity },
  { title: 'Fleet and fuel control', description: 'Reduce fuel loss, improve driver behaviour and raise asset utilisation.', icon: Truck },
  { title: 'Environmental compliance', description: 'Keep continuous records of the conditions you are required to manage.', icon: Leaf },
  { title: 'Faster field response', description: 'Route alerts to the right team before a small fault becomes a service outage.', icon: Headset },
];

export const iotConnectivityPath = [
  { title: 'Devices', description: 'Sensors, meters, trackers and industrial equipment.', icon: Radar },
  { title: 'Gateways', description: 'Protocol translation, local buffering and device security.', icon: Antenna },
  { title: 'Backhaul', description: 'Cellular, Ethernet or satellite paths out of the site.', icon: Satellite },
  { title: 'Platform', description: 'Device management, telemetry, storage and APIs.', icon: CloudCog },
  { title: 'Applications', description: 'Dashboards, alerts and business-system integration.', icon: Gauge },
];
