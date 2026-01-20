"""
Script để test CORS configuration
"""
import requests

# Test OPTIONS request (preflight)
print("Testing OPTIONS request (preflight)...")
try:
    response = requests.options(
        "http://localhost:8000/forecast/forecast",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        }
    )
    print(f"Status Code: {response.status_code}")
    print(f"All Response Headers:")
    for key, value in response.headers.items():
        print(f"  {key}: {value}")
    print(f"\nCORS Headers:")
    cors_found = False
    for key, value in response.headers.items():
        if "access-control" in key.lower():
            print(f"  {key}: {value}")
            cors_found = True
    if not cors_found:
        print("  ❌ NO CORS HEADERS FOUND!")
except Exception as e:
    print(f"Error: {e}")

# Test POST request
print("\n" + "="*50)
print("Testing POST request...")
try:
    response = requests.post(
        "http://localhost:8000/forecast/forecast",
        json={"start_date": "2024-01-15", "end_date": "2024-01-18"},
        headers={
            "Origin": "http://localhost:3000",
            "Content-Type": "application/json",
        }
    )
    print(f"Status Code: {response.status_code}")
    print(f"CORS Headers:")
    cors_found = False
    for key, value in response.headers.items():
        if "access-control" in key.lower():
            print(f"  {key}: {value}")
            cors_found = True
    if not cors_found:
        print("  ❌ NO CORS HEADERS FOUND!")
    if response.status_code == 404:
        print("  ⚠️  Endpoint not found - check route registration")
except Exception as e:
    print(f"Error: {e}")
