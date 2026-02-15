#!/usr/bin/env sh
# Garante PRISMA_CLIENT_ENGINE_TYPE=library durante o build (evita erro na Vercel).
export PRISMA_CLIENT_ENGINE_TYPE=library
prisma generate && next build
