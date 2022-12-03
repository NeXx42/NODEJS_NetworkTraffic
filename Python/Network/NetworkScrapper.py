import sys
import nmap
import json

nm = None

def TryStart():
    global nm

    if nm is None:
        nm = nmap.PortScanner()

    return nm

def GrabDevicesOS(at, args):
    scanner = TryStart()
    return json.dumps(scanner.scan(hosts=at, arguments=args))

print(GrabDevicesOS(sys.argv[1], sys.argv[2]))
#print(GrabDevicesOS("192.168.0.10", "-O"))