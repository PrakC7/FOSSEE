"""Compatibility shim for Python 3.12+ where the stdlib cgi module was removed.

This project uses an older Django version that imports cgi.parse_header and
cgi.valid_boundary.
"""

import re


def parse_header(line):
    """Parse a Content-type like header.

    Returns a tuple of (main_value, params_dict), mirroring stdlib cgi behavior
    used by Django.
    """
    if not line:
        return "", {}

    parts = [part.strip() for part in line.split(";")]
    key = parts[0]
    params = {}

    for part in parts[1:]:
        if "=" not in part:
            continue
        name, value = part.split("=", 1)
        name = name.strip().lower()
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] == '"':
            value = value[1:-1].replace(r'\\', '\\').replace(r'\"', '"')
        params[name] = value

    return key, params


def valid_boundary(value):
    """Return a regex match object if value is a valid multipart boundary."""
    if isinstance(value, bytes):
        pattern = b"^[ -~]{0,200}[!-~]$"
    else:
        pattern = r"^[ -~]{0,200}[!-~]$"
    return re.match(pattern, value)
